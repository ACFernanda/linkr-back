import { Router } from "express";
import { likePost, dislikePost } from "../controllers/likesController.js";
import { tokenValidator } from "../middlewares/tokenValidator.js";

const likesRouter = Router();

likesRouter.post("/likes", tokenValidator, likePost);
likesRouter.patch("/likes", tokenValidator, dislikePost);

export default likesRouter;
