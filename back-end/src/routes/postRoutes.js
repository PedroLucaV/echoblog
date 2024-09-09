import { Router } from "express";
import controllers from "../controllers/posts/controllers.js";
import imageUpload from "../helpers/imageUpload.js";

const router = Router();

router.post('/:id/image', imageUpload.single('image'), controllers.uploadImage)
router.post('/', imageUpload.single('image'), controllers.createPost);
router.get('/:id', controllers.getById);
router.get('/', controllers.getTasksByPage);
router.put('/:id', controllers.updatePost);
router.delete('/:id', controllers.deletePost);


export default router;