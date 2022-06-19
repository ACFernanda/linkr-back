import { Router } from "express";

import { signIn, signUp } from "../controllers/authController.js";
import { validateSignIn, validateSignUp, userIsUnique, findUser, validatePassword } from "../middlewares/authValidator.js";

const authRouter = Router();

authRouter.post('/sign-in', validateSignIn, findUser, validatePassword, signIn);
authRouter.post('/sign-up', validateSignUp, userIsUnique, signUp);
