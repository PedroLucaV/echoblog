import { Router } from "express";
import controllers from "../controllers/users/controllers.js";
import verifyToken from '../helpers/verifyToken.js';
import verifyAdmin from '../helpers/verifyAdmin.js'

const router = Router();

router.post('/register', controllers.createUser);
router.post('/login', controllers.loginController);
router.put('/:id', verifyToken, controllers.editUser)
router.get('/', verifyToken, verifyAdmin, controllers.getUsers);
router.delete('/:id', verifyToken, verifyAdmin, controllers.deleteUser);

export default router;