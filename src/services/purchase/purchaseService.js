import { Op } from 'sequelize';

import PurchaseModel from '../../models/purchase/purchaseModel.js';
import ItemModel from '../../models/items/itemsModel.js';

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

        const purchaseUpdate = await PurchaseModel.update(
          {
            discount: dataPurchase.discount,
            gross_price: dataPurchase.gross_price,
            net_price: dataPurchase.net_price
          },
          {
            where: { id: dataPurchase.id }
          }
        );
      } else {
        const itemUpdate = await ItemModel.update(
          {
            quantity: purchaseObject[0].quantity + data.product.quantity
          },
          {
            where: { id: purchaseObject[0].id }
          }
        );

        const purchaseUpdate = await PurchaseModel.update(
          {
            discount: dataPurchase.discount,
            gross_price: dataPurchase.gross_price,
            net_price: dataPurchase.net_price
          },
          {
            where: { id: dataPurchase.id }
          }
        );
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

// export const FinalizePurchaseService = async (data) => {
//   let status = 400;
//   let message = '';

//   try {

//     status = 201;
//     message = 'Produto adicionado no carrinho!';

//     return { status, message };

//   } catch (e) {
//     throw new Error(e);
//   };
// };