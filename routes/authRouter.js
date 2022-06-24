import { Router } from "express";

import {
  signIn,
  signUp,
  desactivateToken,
} from "../controllers/authController.js";
import {
  validateSignIn,
  validateSignUp,
  userIsUnique,
  findUser,
} from "../middlewares/authValidator.js";
import { tokenValidator } from "../middlewares/tokenValidator.js";

const authRouter = Router();

authRouter.post("/sign-in", validateSignIn, findUser, signIn);
authRouter.post("/sign-up", validateSignUp, userIsUnique, signUp);
authRouter.patch("/sessions", tokenValidator, desactivateToken);

export default authRouter;
