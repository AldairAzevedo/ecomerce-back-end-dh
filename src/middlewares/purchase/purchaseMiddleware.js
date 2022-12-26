import {
  createPurchaseSchema,
  listPurchaseSchema,
  finalizePurchaseSchema,
  updatePurchaseSchema,
  deletePurchaseSchema
} from "../../validations/purchase/purchaseSchema.js";

export const createPurchaseMiddleware = async (req, res, next) => {
  const purchase = req.body;
  try {
    await createPurchaseSchema.validate(purchase);
    return next();
  } catch (e) {
    return res.status(406).json({ message: e.errors[0] });
  }
};

export const listPurchaseMiddleware = async (req, res, next) => {
  const purchase = req.query;
  try {
    await listPurchaseSchema.validate(purchase);
    return next();
  } catch (e) {
    return res.status(406).json({ message: e.errors[0] });
  }
};

export const finlaizePurchaseMiddleware = async (req, res, next) => {
  const purchase = req.body;
  try {
    await finalizePurchaseSchema.validate(purchase);
    return next();
  } catch (e) {
    return res.status(406).json({ message: e.errors[0] });
  }
};

export const updatePurchaseMiddleware = async (req, res, next) => {
  const purchase = req.body;
  try {
    await updatePurchaseSchema.validate(purchase);
    return next();
  } catch (e) {
    return res.status(406).json({ message: e.errors[0] });
  }
};

export const deletePurchaseMiddleware = async (req, res, next) => {
  const purchase = req.body;
  try {
    await deletePurchaseSchema.validate(purchase);
    return next();
  } catch (e) {
    return res.status(406).json({ message: e.errors[0] });
  }
};