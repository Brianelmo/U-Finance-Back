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
}
