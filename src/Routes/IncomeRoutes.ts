import { Router } from "express";
import {IncomeController} from "../Controllers/income.controller";

const router = Router();

router.post('/createincome', IncomeController.crearIngreso);
router.get('/income/:usuarioId', IncomeController.getIncomeUser);
router.delete('/income/:id',(req,res,next) => {{IncomeController.deletIncome(req,res,next)}});

export default router;