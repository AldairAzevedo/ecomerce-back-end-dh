import CategoryModel from "../../models/category/categoryModel.js";

export const createCategoryService = async (data) => {
  let status = 400;
  let message = '';
  try {
    const categoryCreate = await CategoryModel.create({
      ...data
    });

    status = 201;
    message = 'Categoria criada com sucesso!';
    return { status, message };

  } catch (e) {
    throw new Error(e);
  };
};