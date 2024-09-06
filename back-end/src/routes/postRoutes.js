import { Router } from "express";
import controllers from "../controllers/controllers.js";

const router = Router();

router.post('/posts', controllers.createPost);
router.get('/posts/:id', controllers.getById);
router.get('/posts', controllers.getTasksByPage);
router.put('/posts/:id', controllers.updatePost)
router.delete('/posts/:id', controllers.delete)

export default router;