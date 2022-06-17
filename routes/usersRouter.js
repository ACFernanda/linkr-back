import { Router } from "express";
import { getUsers } from "../controllers/usersController.js";
import { tokenValidator } from "../middlewares/tokenValidator.js";

const usersRouter = Router();

usersRouter.get("/users", tokenValidator, getUsers);
export default usersRouter;