import { Router } from "express";

import hashtagRouter from "./hashtagRouter.js";

import postsRouter from "./postsRouter.js";
import usersRouter from "./usersRouter.js";
import likesRouter from "./likesRouter.js";
import authRouter from "./authRouter.js";
import followsRouter from "./followsRouter.js";

const router = Router();

// rota.use(função);
router.use(hashtagRouter);
router.use(postsRouter);
router.use(usersRouter);
router.use(likesRouter);
router.use(authRouter);
router.use(followsRouter);

export default router;
