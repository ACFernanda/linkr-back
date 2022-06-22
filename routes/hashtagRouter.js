import { Router } from "express";
import { getHashtagList, getPostsByHashtag} from '../controllers/hashtagController.js'
import { tokenValidator } from "../middlewares/tokenValidator.js";
const hashtagRouter= Router();

hashtagRouter.get('/hashtag', tokenValidator, getHashtagList);
hashtagRouter.get('/hashtag/:word', tokenValidator, getPostsByHashtag);

export default hashtagRouter;