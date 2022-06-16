import { Router } from "express";

import { tokenValidator } from "../middlewares/tokenValidator.js";
import { getAllPosts, publishNewPost } from "../controllers/postsController.js";
import { newPostValidator } from "../middlewares/newPostValidator.js";

const postsRouter = Router();

postsRouter.get("/posts", tokenValidator, getAllPosts);
postsRouter.post("/posts", tokenValidator, newPostValidator, publishNewPost);

export default postsRouter;
