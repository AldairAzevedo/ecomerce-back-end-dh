import { Router } from "express";

import {
  createUserController,
  deleteUserController,
  listUsersController,
  updateUserController,
  loginUserController
} from "../../controllers/user/userController.js";

import {
  createUserMiddleware,
  authUserMiddleware
} from "../../middlewares/user/userMiddleware.js";

const userRoute = Router();

userRoute.post("/create", createUserMiddleware, createUserController);
userRoute.post("/login", authUserMiddleware, loginUserController);

userRoute.get("/users", listUsersController);
userRoute.delete("/users/:id", deleteUserController);
userRoute.patch("/users/:id", updateUserController);

export default userRoute;
