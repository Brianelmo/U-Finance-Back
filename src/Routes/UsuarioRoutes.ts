import { Router } from "express";
import { UserController } from "../Controllers/user.controller";

const router = Router();

router.post('/userlogin',(req, res, next) => {{UserController.Login(req, res, next)}});
router.post('/registro', UserController.CrearUser);

export default router;
