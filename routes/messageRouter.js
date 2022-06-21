import { Router } from "express";
import {getMessages,postMessage} from '../controllers/messageController.js'
import { tokenValidator } from "../middlewares/tokenValidator.js";
import { messageValidator } from "../middlewares/messageValidator.js";

const messageRouter= Router();

messageRouter.post('/messages/:postId',  tokenValidator, messageValidator, postMessage)
messageRouter.get('/messages/:postId', tokenValidator,getMessages)

export default messageRouter