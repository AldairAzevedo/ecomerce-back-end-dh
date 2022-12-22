import {
  createUserSchema,
  authUserSchema
} from "../../validations/user/userSchema.js";

export const createUserMiddleware = async (req, res, next) => {
  const user = req.body;
  try {
    await createUserSchema.validate(user);
    return next();
  } catch (e) {
    return res.status(406).json({ message: e.errors[0] });
  }
};

export const authUserMiddleware = async (req, res, next) => {
  const user = req.body;
  try {
    await authUserSchema.validate(user);
    return next();
  } catch (e) {
    return res.status(406).json({ message: e.errors[0] });
  }
};