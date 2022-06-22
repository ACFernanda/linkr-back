import { Router } from "express";
import { followUser, unfollowUser } from "../controllers/followsController.js";
import { tokenValidator } from "../middlewares/tokenValidator.js";

const followsRouter = Router();

followsRouter.post("/follows", tokenValidator, followUser);
followsRouter.patch("/follows", tokenValidator, unfollowUser);

export default followsRouter;
