import { Router } from "express";

import { signIn, signUp } from "../controllers/authController.js";
import { validateSignIn, validateSignUp, userIsUnique, findUser } from "../middlewares/authValidator.js";

const authRouter = Router();

authRouter.post('/sign-in', validateSignIn, findUser, signIn);
authRouter.post('/sign-up', validateSignUp, userIsUnique, signUp);

export default authRouter;