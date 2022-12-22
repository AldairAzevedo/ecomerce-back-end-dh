import {
  createProductService,
  listProductParamsService
} from "../../services/product/prouctService.js";

export const createProductController = async (req, res) => {
  try {
    const product = await createProductService(req.body);
    return res.status(product.status).json(product.message);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  };
};

export const listProductParamsController = async (req, res) => {
  try {
    const product = await listProductParamsService(req.query);
    return res.status(product.status).json(product.message);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  };
};