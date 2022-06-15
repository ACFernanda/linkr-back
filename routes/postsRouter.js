import { Router } from "express";

import { tokenValidator } from "../middlewares/tokenValidator.js";
import { getAllPosts, publishNewPost } from "../controllers/postsController.js";

const postsRouter = Router();

postsRouter.get("/posts", tokenValidator, getAllPosts);
postsRouter.post("/posts", tokenValidator, publishNewPost);

export default postsRouter;
