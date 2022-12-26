import { Router } from "express";

import {
  createCategoryController
} from "../../controllers/category/categoryController.js";

import { verifyTokenMiddleware } from "../../middlewares/contextMiddlewares.js";

import { createCategoryMiddleware } from "../../middlewares/category/categoryMiddleware.js";

const categoryRoute = Router();

categoryRoute.post("/create", verifyTokenMiddleware, createCategoryMiddleware, createCategoryController);

export default categoryRoute;
