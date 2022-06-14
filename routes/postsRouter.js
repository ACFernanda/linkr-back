import { Router } from "express";

import { getAllPosts, publishNewPost } from "../controllers/postsController.js";

const postsRouter = Router();

postsRouter.get("/posts", getAllPosts);
postsRouter.post("/posts", publishNewPost);

export default postsRouter;
