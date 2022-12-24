import { Router } from "express";

import {
  createUserController,
  listUsersController,
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

export default userRoute;
