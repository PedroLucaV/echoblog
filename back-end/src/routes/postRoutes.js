import { Router } from "express";
import controllers from "../controllers/controllers.js";

const router = Router();

router.post('/posts', controllers.createPost);

export default router;