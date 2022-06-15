import { Router } from "express";
import hashtagRouter from "./hashtagRouter.js";

const router = Router();

// rota.use(função);
router.use(hashtagRouter)


export default router;
