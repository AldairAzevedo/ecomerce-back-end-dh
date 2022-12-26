import {
  createPurchaseService,
  listPurchaseService,
  finalizePurchaseService,
  updatePurchaseService,
  deleteItemService,
  listPurchaseFinalizededService
} from "../../services/purchase/purchaseService.js";

export const createPurchaseController = async (req, res) => {
  try {
    const purchase = await createPurchaseService(req.body);
    return res.status(purchase.status).json(purchase.message);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  };
};

export const listPurchaseController = async (req, res) => {
  try {
    const purchase = await listPurchaseService(req.query);
    return res.status(purchase.status).json(purchase.message);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  };
};

export const updatePurchaseController = async (req, res) => {
  try {
    const purchase = await updatePurchaseService(req.body);
    return res.status(purchase.status).json(purchase.message);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  };
};

export const finalizePurchaseController = async (req, res) => {
  try {
    const purchase = await finalizePurchaseService(req.body);
    return res.status(purchase.status).json(purchase.message);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  };
};

export const deleteItemController = async (req, res) => {
  try {
    const purchase = await deleteItemService(req.body);
    return res.status(purchase.status).json(purchase.message);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  };
};

export const listPurchaseFinalizededController = async (req, res) => {
  try {
    const purchase = await listPurchaseFinalizededService(req.query);
    return res.status(purchase.status).json(purchase.message);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  };
};
