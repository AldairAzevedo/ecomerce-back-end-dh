import { Router } from "express";

import {
  createPurchaseController,
  listPurchaseController,
  finalizePurchaseController,
  updatePurchaseController
} from "../../controllers/purchase/purcahseController.js";

const purchaseRoute = Router();

purchaseRoute.get("/list", listPurchaseController);
purchaseRoute.patch("/update", updatePurchaseController);
purchaseRoute.post("/add", createPurchaseController);
purchaseRoute.post("/finalize", finalizePurchaseController);

export default purchaseRoute;