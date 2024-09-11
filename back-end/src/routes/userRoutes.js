import { Router } from "express";
import controllers from "../controllers/users/controllers.js";
import verifyToken from '../helpers/verifyToken.js';
import verifyAdmin from '../helpers/verifyAdmin.js'
import imageUpload from "../helpers/imageUpload.js";

const router = Router();

router.post('/register', imageUpload.single('image'), controllers.createUser);
router.post('/login', controllers.loginController);
router.put('/:id', verifyToken, imageUpload.single('image'), controllers.editUser)
router.get('/', verifyToken, verifyAdmin, controllers.getUsers);
router.delete('/:id', verifyToken, verifyAdmin, controllers.deleteUser);
router.patch('/:id/papel', verifyToken, verifyAdmin, controllers.changePaper)

export default router;