import { createCategorySchema } from "../../validations/category/categorySchema.js";

export const createCategoryMiddleware = async (req, res, next) => {
  const category = req.body;
  try {
    await createCategorySchema.validate(category);
    return next();
  } catch (e) {
    return res.status(406).json({ message: e.errors[0] });
  }
};