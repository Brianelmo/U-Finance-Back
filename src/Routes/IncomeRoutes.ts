import { Router } from "express";
import {IncomeController} from "../Controllers/income.controller";

const router = Router();

router.post('/createincome', IncomeController.crearIngreso);

export default router;