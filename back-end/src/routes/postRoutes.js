import { Router } from "express";
import controllers from "../controllers/posts/controllers.js";
import controllersComm from '../controllers/comments/controllers.js'
import imageUpload from "../helpers/imageUpload.js";
import verifyRole from "../helpers/verifyRole.js";
import verifyToken from "../helpers/verifyToken.js";

const router = Router();

router.post('/:id/image', imageUpload.single('image'), controllers.uploadImage)
router.post('/', verifyToken, verifyRole, imageUpload.single('image'), controllers.createPost);
router.get('/:id', controllers.getById);
router.get('/', controllers.getTasksByPage);
router.put('/:id', controllers.updatePost);
router.delete('/:id', controllers.deletePost);
router.get('/', controllers.getByAuthor);
router.post('/:id/comments', verifyToken, controllersComm.PostComment)
router.get('/:id/comments', controllersComm.GetComment)

export default router;