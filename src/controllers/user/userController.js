import {
  createUserService,
  loginUserService
} from "../../services/user/userService.js";

export const createUserController = async (req, res) => {
  try {
    const user = await createUserService(req.body);
    return res.status(user.status).json(user.message);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

export const loginUserController = async (req, res) => {
  try {
    const user = await loginUserService(req.body);
    return res.status(user.status).json(user.message);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};