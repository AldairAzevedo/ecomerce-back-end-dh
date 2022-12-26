import { Router } from "express";

import {
  createPurchaseController,
  listPurchaseController,
  finalizePurchaseController,
  updatePurchaseController,
  deleteItemController,
  listPurchaseFinalizededController
} from "../../controllers/purchase/purcahseController.js";

import { verifyTokenMiddleware } from "../../middlewares/contextMiddlewares.js";

import {
  createPurchaseMiddleware,
  listPurchaseMiddleware,
  finlaizePurchaseMiddleware,
  updatePurchaseMiddleware,
  deletePurchaseMiddleware
} from "../../middlewares/purchase/purchaseMiddleware.js";

const purchaseRoute = Router();

purchaseRoute.get("/list", verifyTokenMiddleware, listPurchaseMiddleware, listPurchaseController);
purchaseRoute.get("/list/finished", verifyTokenMiddleware, listPurchaseMiddleware, listPurchaseFinalizededController);
purchaseRoute.post("/add", verifyTokenMiddleware, createPurchaseMiddleware, createPurchaseController);
purchaseRoute.patch("/update", verifyTokenMiddleware, updatePurchaseMiddleware, updatePurchaseController);
purchaseRoute.patch("/finalize", verifyTokenMiddleware, finlaizePurchaseMiddleware, finalizePurchaseController);
purchaseRoute.delete("/delete", verifyTokenMiddleware, deletePurchaseMiddleware, deleteItemController);

export default purchaseRoute;