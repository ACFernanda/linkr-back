import { Router } from "express";
import { getUserPosts, getUsers } from "../controllers/usersController.js";
import { tokenValidator } from "../middlewares/tokenValidator.js";
import { userValidator } from "../middlewares/userValidator.js";

const usersRouter = Router();

usersRouter.post("/users", tokenValidator, getUsers);
usersRouter.get("/users/:id", tokenValidator, userValidator, getUserPosts);

export default usersRouter;
