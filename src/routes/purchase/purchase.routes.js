import { Router } from "express";

import {
  createPurchaseController,
  listPurchaseController,
  finalizePurchaseController,
  updatePurchaseController,
  deleteItemController,
  listPurchaseFinalizededController
} from "../../controllers/purchase/purcahseController.js";

const purchaseRoute = Router();

purchaseRoute.get("/list", listPurchaseController);
purchaseRoute.get("/list/finished", listPurchaseFinalizededController);
purchaseRoute.post("/add", createPurchaseController);
purchaseRoute.patch("/update", updatePurchaseController);
purchaseRoute.patch("/finalize", finalizePurchaseController);
purchaseRoute.delete("/delete", deleteItemController);

export default purchaseRoute;