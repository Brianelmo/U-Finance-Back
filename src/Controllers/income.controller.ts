import { NextFunction, Request, Response } from "express";
import { Income } from "../services/income.services";

export class IncomeController {
    static async crearIngreso(req: Request, res: Response, next: NextFunction) {
        try {
            const {motivoEntrada, usuarioId, entradaNum} = req.body;

            const nuevoIngreso = await Income.createIngreso(entradaNum, usuarioId, motivoEntrada);
            res.status(201).json({message: "Ingreso registrado con exito", ingreso: nuevoIngreso});
        } catch (error) {
            res.status(500).json({error: error});
            next(error);
        }
    }
}