import { Router } from "express";

import {
  createCategoryController
} from "../../controllers/category/categoryController.js";

const categoryRoute = Router();

categoryRoute.post("/create", createCategoryController);

export default categoryRoute;
