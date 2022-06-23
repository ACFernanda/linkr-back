import { Router } from "express";
import { postShare } from '../controllers/shareController.js'
import { tokenValidator } from "../middlewares/tokenValidator.js";
const shareRouter= Router();

shareRouter.post('/share/:id', tokenValidator, postShare );

export default shareRouter;