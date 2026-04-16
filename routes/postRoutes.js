import express from 'express'
import { createPost, getAllPosts , deltePost} from '../controller/postController.js';
import authUser from '../middleware/authUser.js';
import upload from '../middleware/upload.js';

const postRouter = express.Router();

postRouter.post("/create", authUser, upload.array("media"), createPost);
postRouter.get("/all", getAllPosts);
postRouter.delete("/delete/:delid", authUser, deltePost)

export default postRouter;