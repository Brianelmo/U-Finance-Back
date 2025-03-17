import { NextFunction, Request, Response } from "express";
import { Expense } from "../services/expenses.services";

export class ExpenseController {
  static async crearGasto(req: Request, res: Response, next: NextFunction) {
    try {
      const { motivoGasto, usuarioId, gastoNum } = req.body;

      const nuevoGasto = await Expense.createGasto(
        motivoGasto,
        usuarioId,
        gastoNum
      );
      res
        .status(201)
        .json({ message: "Gasto registrado con exito", gasto: nuevoGasto });
    } catch (error) {
      res.status(500).json({ error: error });
      next(error);
    }
  }

  static async obtenerGastosUsuario(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { usuarioId } = req.params;
      const gastos = await Expense.obtenerGastosUsuario(Number(usuarioId));
      res.json({ message: "Gastos del usuario", gastos });
    } catch (error) {
      res.status(500).json({ error: error });
      next(error);
    }
  }

  static async deleteExpense(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const expense = await Expense.getExpenseForId(Number(id));
      if (!expense) {
        return res.status(400).json({ message: "Gasto no encontrado" });
      }
      const expenseDelete = await Expense.deleteExpense(Number(id));
      res.json({ message: "Gasto eliminado con exito", expenseDelete });
      console.log(expenseDelete);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async editExpense(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { gastoNum, motivoGasto } = req.body;
      const expense = await Expense.getExpenseForId(Number(id));

      if (!expense) {
        return res.status(400).json({ message: "Gasto no encontrado" });
      }

      const updateExpense = await Expense.editExpense(
        Number(id),
        gastoNum,
        motivoGasto
      );
      res
        .status(201)
        .json({ message: "El gasto fue editado con exito", updateExpense });
      console.log("el dato fue editado con exito", updateExpense);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
