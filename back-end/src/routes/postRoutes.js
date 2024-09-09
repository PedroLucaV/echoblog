import { Router } from "express";
import controllers from "../controllers/posts/controllers.js";
import imageUpload from "../helpers/imageUpload.js";

const router = Router();

router.post('/posts/:id/image', imageUpload.single('image'), controllers.uploadImage)
router.post('/posts', imageUpload.single('image'), controllers.createPost);
router.get('/posts/:id', controllers.getById);
router.get('/posts', controllers.getTasksByPage);
router.put('/posts/:id', controllers.updatePost);
router.delete('/posts/:id', controllers.deletePost);


export default router;