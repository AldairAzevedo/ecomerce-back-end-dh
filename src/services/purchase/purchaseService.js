import { Sequelize, Op } from 'sequelize';

import PurchaseModel from '../../models/purchase/purchaseModel.js';
import ItemModel from '../../models/items/itemsModel.js';
import ProductModel from '../../models/product/productModel.js';

export const createPurchaseService = async (data) => {
  let status = 400;
  let message = '';

  try {
    let dataItem = {
      id_purc: null,
      id_prod: data.product.id,
      quantity: data.product.quantity
    };

    let dataPurchase = {
      id: null,
      situation: data.purchase.situation,
      discount: data.product.discount * data.product.quantity,
      gross_price: data.product.price * data.product.quantity,
      net_price: (data.product.price * data.product.quantity) - (data.product.discount * data.product.quantity),
      id_user: data.id_user
    };

    const listPurchase = await ItemModel.findAll({
      attributes: {
        exclude: ['updatedAt', 'createdAt']
      },
      include: {
        model: PurchaseModel,
        attributes: {
          exclude: ['updatedAt', 'createdAt', 'id_user', 'payment_type']
        },
        where: {
          id_user: data.id_user,
          situation: 'CA'
        }
      }
    });

    const purchaseJson = JSON.stringify(listPurchase);
    const purchaseObject = JSON.parse(purchaseJson);

    if (purchaseObject.length > 0) {
      dataItem.id_purc = purchaseObject[0].purchase.id;
      dataPurchase.id = purchaseObject[0].purchase.id;

      dataPurchase.discount = purchaseObject[0].purchase.discount + (data.product.discount * data.product.quantity);
      dataPurchase.gross_price = purchaseObject[0].purchase.gross_price + (data.product.price * data.product.quantity);
      dataPurchase.net_price = (purchaseObject[0].purchase.gross_price + (data.product.price * data.product.quantity)) - (purchaseObject[0].purchase.discount + (data.product.discount * data.product.quantity));

      const verification = purchaseObject.some((item) => {
        return item.id_prod === data.product.id;
      });

      if (!verification) {
        const itemCreate = await ItemModel.create({
          ...dataItem
        });

        const purchaseUpdate = await PurchaseModel.update({
          discount: dataPurchase.discount,
          gross_price: dataPurchase.gross_price,
          net_price: dataPurchase.net_price
        }, {
          where: {
            id: dataPurchase.id
          }
        });
      } else {
        const itemUpdate = await ItemModel.update({
          quantity: purchaseObject[0].quantity + data.product.quantity
        }, {
          where: {
            id: purchaseObject[0].id
          }
        });

        const purchaseUpdate = await PurchaseModel.update({
          discount: dataPurchase.discount,
          gross_price: dataPurchase.gross_price,
          net_price: dataPurchase.net_price
        }, {
          where: {
            id: dataPurchase.id
          }
        });
      };

      status = 201;
      message = 'Produto adicionado no carrinho!';
    } else {
      const purchaseCreate = await PurchaseModel.create({
        ...dataPurchase
      });

      const purchaseJson = JSON.stringify(purchaseCreate);
      const purchaseObject = JSON.parse(purchaseJson);

      dataItem.id_purc = purchaseObject.id;

      const itemCreate = await ItemModel.create({
        ...dataItem
      });

      status = 201;
      message = 'Produto adicionado no carrinho!';
    };

    return { status, message };

  } catch (e) {
    throw new Error(e);
  };
};

export const listPurchaseService = async (data) => {
  let status = 400;
  let message = '';

  try {
    const listPurchase = await PurchaseModel.findAll({
      attributes: {
        exclude: [
          'updatedAt',
          'createdAt',
          'payment_type',
          'id_user',
          'situation',
          'shipping'
        ]
      },
      where: {
        id_user: data.id_user,
        situation: 'CA'
      }
    });

    const listItem = await ItemModel.findAll({
      attributes: {
        exclude: [
          'updatedAt',
          'createdAt',
          'id_purc',
          'id_prod',
          'id'
        ]
      },
      include: [
        {
          model: PurchaseModel,
          attributes: {
            exclude: [
              'updatedAt',
              'createdAt',
              'id_user',
              'payment_type',
              'id',
              'situation',
              'discount',
              'gross_price',
              'net_price',
              'shipping'
            ]
          },
          where: {
            id_user: data.id_user,
            situation: 'CA'
          },
          required: true
        }, {
          model: ProductModel,
          attributes: {
            exclude: [
              'description',
              'inventory',
              'active',
              'updatedAt',
              'createdAt',
              'id_cat'
            ]
          },
          where: {
            active: 'A'
          },
          required: true
        }
      ]
    });

    const returnFinal = listPurchase.concat(listItem);

    status = 200;
    message = returnFinal;

    return { status, message };

  } catch (e) {
    throw new Error(e);
  };
};

export const updatePurchaseService = async (data) => {
  let status = 400;
  let message = '';

  try {
    const listPurchase = await ItemModel.findAll({
      attributes: {
        exclude: [
          'updatedAt',
          'createdAt',
          'id',
          'id_purc',
          'id_prod'
        ]
      },
      where: {
        id_prod: data.id_product
      },
      include: [
        {
          model: PurchaseModel,
          attributes: {
            exclude: [
              'updatedAt',
              'createdAt',
              'id_user',
              'payment_type',
              'situation',
              'id'
            ]
          },
          where: {
            id: data.id_purchase,
            situation: 'CA'
          },
          required: true
        }, {
          model: ProductModel,
          attributes: {
            exclude: [
              'id',
              'name',
              'description',
              'inventory',
              'photo',
              'active',
              'createdAt',
              'updatedAt',
              'id_cat'
            ]
          },
          where: {
            id: data.id_product,
            active: 'A'
          },
          required: true
        }
      ]
    });

    const purchaseJson = JSON.stringify(listPurchase);
    const purchaseObject = JSON.parse(purchaseJson);

    if (data.option === 'add') {
      const dataItem = {
        quantity: purchaseObject[0].quantity + 1
      };

      const dataPurchase = {
        discount: purchaseObject[0].purchase.discount + purchaseObject[0].product.discount,
        gross_price: purchaseObject[0].purchase.gross_price + purchaseObject[0].product.price,
        net_price: purchaseObject[0].purchase.net_price + (purchaseObject[0].product.price - purchaseObject[0].product.discount)
      };

      const itemUpdate = await ItemModel.update({
        quantity: dataItem.quantity
      }, {
        where: {
          id_purc: data.id_purchase,
          id_prod: data.id_product
        }
      });

      const purchaseUpdate = await PurchaseModel.update({
        discount: dataPurchase.discount,
        gross_price: dataPurchase.gross_price,
        net_price: dataPurchase.net_price
      }, {
        where: {
          id: data.id_purchase
        }
      });
    } else {
      const dataItem = {
        quantity: purchaseObject[0].quantity - 1
      };

      const dataPurchase = {
        discount: purchaseObject[0].purchase.discount - purchaseObject[0].product.discount,
        gross_price: purchaseObject[0].purchase.gross_price - purchaseObject[0].product.price,
        net_price: purchaseObject[0].purchase.net_price - (purchaseObject[0].product.price - purchaseObject[0].product.discount)
      };

      const itemUpdate = await ItemModel.update({
        quantity: dataItem.quantity
      }, {
        where: {
          id_purc: data.id_purchase,
          id_prod: data.id_product
        }
      });

      const listItem = await ItemModel.findAll({
        attributes: {
          exclude: [
            'id',
            'createdAt',
            'updatedAt',
            'id_prod',
            'id_purc'
          ]
        },
        where: {
          id_purc: data.id_purchase,
          id_prod: data.id_product
        }
      });

      const itemUpJson = JSON.stringify(listItem);
      const itemUpObject = JSON.parse(itemUpJson);

      if (itemUpObject[0].quantity === 0 || itemUpObject[0].quantity < 0) {
        const itemDelete = await ItemModel.destroy({
          where: {
            id_purc: data.id_purchase,
            id_prod: data.id_product
          }
        });
      };

      const purchaseUpdate = await PurchaseModel.update({
        discount: dataPurchase.discount,
        gross_price: dataPurchase.gross_price,
        net_price: dataPurchase.net_price
      }, {
        where: {
          id: data.id_purchase
        }
      });
    };

    const purchaseList = await PurchaseModel.findAll({
      attributes: {
        exclude: [
          'id',
          'payment_type',
          'situation',
          'shipping',
          'createdAt',
          'updatedAt',
          'id_user'
        ]
      },
      where: {
        id: data.id_purchase,
        situation: 'CA'
      }
    });

    const purchaseUpJson = JSON.stringify(purchaseList);
    const purchaseUpObject = JSON.parse(purchaseUpJson);

    if (purchaseUpObject[0].gross_price === 0 || purchaseUpObject[0].gross_price < 0) {
      const purchaseDelete = await PurchaseModel.destroy({
        where: {
          id: data.id_purchase
        }
      });
    };

    status = 200;
    message = 'Item alterado!';

    return { status, message };

  } catch (e) {
    throw new Error(e);
  };
};

export const finalizePurchaseService = async (data) => {
  let status = 400;
  let message = '';

  try {
    const listPurchase = await PurchaseModel.findAll({
      where: {
        id: data.id_purchase,
        situation: 'CA'
      }
    });

    if (listPurchase.length > 0) {
      const listItem = await ItemModel.findAll({
        attributes: {
          exclude: ['id', 'createdAt', 'updatedAt', 'id_purc']
        },
        where: {
          id_purc: data.id_purchase
        }
      });

      const itemJson = JSON.stringify(listItem);
      const itemObject = JSON.parse(itemJson);

      itemObject.forEach(async item => {
        const listProduct = await ProductModel.findAll({
          attributes: {
            exclude: ['id', 'name', 'description', 'price', 'discount', 'photo', 'active', 'createdAt', 'updatedAt', 'id_cat']
          },
          where: {
            id: item.id_prod
          }
        });

        const productJson = JSON.stringify(listProduct);
        const productObject = JSON.parse(productJson);

        const productUpdate = await ProductModel.update(
          {
            inventory: productObject[0].inventory - item.quantity
          },
          {
            where: {
              id: item.id_prod
            }
          }
        );
      });

      const purchaseUpdate = await PurchaseModel.update(
        {
          payment_type: data.payment_type,
          shipping: data.shipping,
          situation: 'CO'
        },
        {
          where: {
            id: data.id_purchase,
            situation: "CA"
          }
        }
      );

      status = 200;
      message = 'Compra finalizada!';

    } else {
      status = 401;
      message = 'Esta compra já foi finalizada ou não existe!';
    };

    return { status, message };

  } catch (e) {
    throw new Error(e);
  };
};

export const deleteItemService = async (data) => {
  let status = 400;
  let message = '';

  try {
    const listPurchase = await PurchaseModel.findAll({
      attributes: {
        exclude: [
          'id',
          'payment_type',
          'situation',
          'shipping',
          'createdAt',
          'updatedAt',
          'id_user'
        ]
      },
      where: {
        id: data.id_purchase,
        situation: 'CA'
      }
    });

    const purchaseJson = JSON.stringify(listPurchase);
    const purchaseObject = JSON.parse(purchaseJson);

    if (listPurchase.length > 0) {
      const listItem = await ItemModel.findAll({
        attributes: {
          exclude: [
            'id',
            'createdAt',
            'updatedAt',
            'id_purc',
            'id_prod'
          ]
        },
        include: [
          {
            model: ProductModel,
            attributes: {
              exclude: [
                'id',
                'name',
                'description',
                'inventory',
                'photo',
                'active',
                'createdAt',
                'updatedAt',
                'id_cat'
              ]
            },
            where: {
              active: 'A'
            },
            required: true
          }
        ],
        where: {
          id_purc: data.id_purchase,
          id_prod: data.id_product
        }
      });

      const itemJson = JSON.stringify(listItem);
      const itemObject = JSON.parse(itemJson);

      const purchaseUpdate = await PurchaseModel.update({
        discount: purchaseObject[0].discount - (itemObject[0].quantity * itemObject[0].product.discount),
        gross_price: purchaseObject[0].gross_price - (itemObject[0].quantity * itemObject[0].product.price),
        net_price: purchaseObject[0].net_price - (
          (itemObject[0].quantity * itemObject[0].product.price) - (itemObject[0].quantity * itemObject[0].product.discount)
        )
      }, {
        where: {
          id: data.id_purchase,
          situation: "CA"
        }
      });

      const itemDelete = await ItemModel.destroy({
        where: {
          id_purc: data.id_purchase,
          id_prod: data.id_product
        }
      });

      const listPurchase = await PurchaseModel.findAll({
        attributes: {
          exclude: [
            'id',
            'payment_type',
            'situation',
            'shipping',
            'createdAt',
            'updatedAt',
            'id_user'
          ]
        },
        where: {
          id: data.id_purchase,
          situation: 'CA'
        }
      });

      const purchaseUpJson = JSON.stringify(listPurchase);
      const purchaseUpObject = JSON.parse(purchaseUpJson);

      if (purchaseUpObject[0].gross_price === 0 || purchaseUpObject[0].gross_price < 0) {
        const purchaseDelete = await PurchaseModel.destroy({
          where: {
            id: data.id_purchase
          }
        });
      };

      status = 200;
      message = 'Item removido!';
    } else {
      status = 401;
      message = 'Produto não pode ser removido, pois a compra já foi finalizada ou não existe!';
    }

    return { status, message };

  } catch (e) {
    throw new Error(e);
  };
};

export const listPurchaseFinalizededService = async (data) => {
  let status = 400;
  let message = '';

  try {
    const listItem = await ItemModel.findAll({
      attributes: {
        exclude: [
          'updatedAt',
          'createdAt',
          'id_purc',
          'id_prod',
          'id'
        ]
      },
      include: [
        {
          model: ProductModel,
          attributes: {
            exclude: [
              'description',
              'inventory',
              'active',
              'updatedAt',
              'createdAt',
              'id_cat'
            ]
          },
          where: {
            active: 'A'
          },
          required: true
        },
        {
          model: PurchaseModel,
          attributes: [
            'id',
            'discount',
            'gross_price',
            'net_price',
            'shipping',
            [Sequelize.literal(
              `CASE 
          WHEN payment_type = 'P' THEN 'PIX' 
          WHEN payment_type = 'C' THEN 'CARTÃO'
          ELSE 'BOLETO' 
          END`), 'payment_type']
          ],
          where: {
            id_user: data.id_user,
            situation: 'CO'
          },
          required: true
        }
      ]
    });

    status = 200;
    message = listItem;

    return { status, message };

  } catch (e) {
    throw new Error(e);
  };
};