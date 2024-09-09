import { Router } from "express";
import controllers from "../controllers/users/controllers.js";
import verifyToken from '../helpers/verifyToken.js'

const router = Router();

router.post('/register', controllers.createUser);
router.post('/login', controllers.loginController);
router.put('/:id', verifyToken, controllers.editUser)

export default router;