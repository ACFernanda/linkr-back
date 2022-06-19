import { Router } from "express";
import postsRouter from "./postsRouter.js";
import usersRouter from "./usersRouter.js";
import likesRouter from "./likesRouter.js";

const router = Router();

router.use(postsRouter);
router.use(usersRouter);
router.use(likesRouter);

export default router;
