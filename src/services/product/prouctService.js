import { Op } from "sequelize";

import ProductModel from "../../models/product/productModel.js";
import CategoryModel from "../../models/category/categoryModel.js";

export const createProductService = async (data) => {
  let status = 400;
  let message = '';
  try {
    const product = await ProductModel.create({
      ...data
    });

    status = 201;
    message = 'Produto criado com sucesso!';
    return { status, message };

  } catch (e) {
    throw new Error(e);
  };
};

export const listProductParamsService = async (data) => {
  let status = 400;
  let message = '';

  const params = {
    name: '',
    priceIni: 1,
    priceFin: 99999
  };

  data.name && data.name !== '' ? params.name = data.name : params.name;
  data.priceIni && data.priceIni !== '' ? params.priceIni = data.priceIni : params.priceIni;
  data.priceFin && data.priceFin !== '' ? params.priceFin = data.priceFin : params.priceFin;

  try {
    const products = await ProductModel.findAll({
      where: {
        active: "A",
        name: {
          [Op.substring]: `%${params.name}%`
        },
        [Op.and]: {
          price: {
            [Op.between]: [params.priceIni, params.priceFin]
          }
        }
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'id_cat']
      },
      include: {
        model: CategoryModel,
        attributes: {
          exclude: ['id', 'description', 'active', 'createdAt', 'updatedAt']
        },
        where: {
          active: "A"
        }
      }
    });

    status = 200;
    message = products;
    return { status, message };

  } catch (e) {
    throw new Error(e);
  };
};