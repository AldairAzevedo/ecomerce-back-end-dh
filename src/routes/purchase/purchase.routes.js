import { Router } from "express";

import {
  createPurchaseController
} from "../../controllers/purchase/purcahseController.js";

const purchaseRoute = Router();

purchaseRoute.post("/create", createPurchaseController);

export default purchaseRoute;