import { Router } from "express";
import {
  followUser,
  unfollowUser,
  getAllFollowing,
} from "../controllers/followsController.js";
import { tokenValidator } from "../middlewares/tokenValidator.js";

const followsRouter = Router();

followsRouter.post("/follows", tokenValidator, followUser);
followsRouter.patch("/follows", tokenValidator, unfollowUser);
followsRouter.get("/follows", tokenValidator, getAllFollowing);

export default followsRouter;
