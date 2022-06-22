import { Router } from "express";
import { getComments, postComment} from '../controllers/commentController.js'
import { tokenValidator } from "../middlewares/tokenValidator.js";
import { commentValidator } from "../middlewares/commentValidator.js";

const commentRouter= Router();

commentRouter.post('/comments/:postId', commentValidator, tokenValidator, postComment)
commentRouter.get('/comments/:postId', tokenValidator,getComments)

export default commentRouter