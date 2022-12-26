import { Router } from "express";

import {
  createProductController,
  listProductParamsController
} from "../../controllers/product/productsController.js";

import { verifyTokenMiddleware } from "../../middlewares/contextMiddlewares.js";

import { createProductMiddleware } from "../../middlewares/product/productMiddleware.js";

const productRoute = Router();

productRoute.post("/create", verifyTokenMiddleware, createProductMiddleware, createProductController);
productRoute.get("/list", listProductParamsController);

export default productRoute;