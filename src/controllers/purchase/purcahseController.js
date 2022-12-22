import { createPurchaseService } from "../../services/purchase/purchaseService.js";

export const createPurchaseController = async (req, res) => {
  try {
    const purchase = await createPurchaseService(req.body);
    return res.status(purchase.status).json(purchase.message);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  };
};