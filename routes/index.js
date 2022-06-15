import { Router } from "express";

import hashtagRouter from "./hashtagRouter.js";

import postsRouter from "./postsRouter.js";


const router = Router();

// rota.use(função);
router.use(hashtagRouter)
router.use(postsRouter);


export default router;
