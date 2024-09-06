import { Router } from "express";
import controllers from "../controllers/controllers.js";
import imageUpload from "../controllers/imageUpload.js";

const router = Router();

router.post('/posts', imageUpload.single('image'), controllers.createPost);
router.get('/posts/:id', controllers.getById);
router.get('/posts', controllers.getTasksByPage);
router.put('/posts/:id', controllers.updatePost);
router.delete('/posts/:id', controllers.deletePost);
router.post('/posts/:id/image', imageUpload.single('image'), controllers.uploadImage)

export default router;