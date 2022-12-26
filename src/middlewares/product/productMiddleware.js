import { createProductSchema } from "../../validations/product/productSchema.js";

export const createProductMiddleware = async (req, res, next) => {
  const product = req.body;
  try {
    await createProductSchema.validate(product);
    return next();
  } catch (e) {
    return res.status(406).json({ message: e.errors[0] });
  }
};