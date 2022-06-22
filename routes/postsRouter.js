import { Router } from "express";
import {ownerCheck} from '../middlewares/ownerCheck.js'
import { tokenValidator } from "../middlewares/tokenValidator.js";
import { getAllPosts, publishNewPost ,editPost,deletePost} from "../controllers/postsController.js";
import { newPostValidator,editPostValidator } from "../middlewares/postValidators.js";

const postsRouter = Router();

postsRouter.get("/posts", tokenValidator, getAllPosts);
postsRouter.post("/posts", tokenValidator, newPostValidator, publishNewPost);
postsRouter.put("/posts/:id", tokenValidator, ownerCheck,editPostValidator, editPost)
postsRouter.delete("/posts/:id", tokenValidator, ownerCheck, deletePost)

export default postsRouter;
