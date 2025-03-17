import { Router } from "express";
import { ExpenseController } from "../Controllers/expenses.controller";

const router = Router();

router.post('/expense',(req, res,next) => {{ExpenseController.crearGasto(req, res, next)}});
router.get('/user/:usuarioId',(req, res,next) => {{ExpenseController.obtenerGastosUsuario(req, res, next)}});
router.delete('/expensedelete/:id',(req,res,next) => {{ExpenseController.deleteExpense(req,res,next)}});
router.put('/usuario/:id',(req,res,next) => {{ExpenseController.editExpense(req, res, next)}});

export default router