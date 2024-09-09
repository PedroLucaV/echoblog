import { Router } from "express";
import controllers from "../controllers/users/controllers.js";

const router = Router();

router.post('/register', controllers.createUser);

export default router;