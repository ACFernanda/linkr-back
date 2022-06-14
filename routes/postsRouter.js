import { Router } from "express";

import { getAllPosts } from "../controllers/postsController.js";

const postsRouter = Router();

postsRouter.get("/posts", getAllPosts);

export default postsRouter;
