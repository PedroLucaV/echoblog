import {Router} from 'express';
import controllers from '../controllers/comments/controllers.js'
import verifyRole from "../helpers/verifyRole.js";
import verifyToken from "../helpers/verifyToken.js";

const router = Router();

router.put('/:id', verifyToken, verifyRole, controllers.editPost)
router.delete('/:id', verifyToken, verifyRole, controllers.deleteComment)

export default router;