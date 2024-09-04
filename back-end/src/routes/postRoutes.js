import { Router } from "express";
import createPost from "../controllers/createPost.js";

const router = Router();

router.post('/posts', createPost);

export default router;