import { createCategoryService } from "../../services/category/categoryService.js";

export const createCategoryController = async (req, res) => {
  try {
    const category = await createCategoryService(req.body);
    return res.status(category.status).json(category.message);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  };
};
