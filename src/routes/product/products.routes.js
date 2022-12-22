import { Router } from "express";

import {
  createProductController,
  listProductParamsController
} from "../../controllers/product/productsController.js";

const productRoute = Router();

productRoute.post("/create", createProductController);
productRoute.get("/list", listProductParamsController);

export default productRoute;