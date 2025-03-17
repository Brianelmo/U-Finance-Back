import { NextFunction, Request, Response } from "express";
import { Income } from "../services/income.services";

export class IncomeController {
    static async crearIngreso(req: Request, res: Response, next: NextFunction) {
        console.log(req.body)
        try {
            const {motivoEntrada, usuarioId, entradaNum} = req.body;

            const nuevoIngreso = await Income.createIngreso(entradaNum, usuarioId, motivoEntrada);
            res.status(201).json({message: "Ingreso registrado con exito", ingreso: nuevoIngreso});
        } catch (error) {
            res.status(500).json({error: error});
            next(error);
        }
    } 

    static async getIncomeUser(req:Request, res:Response, next: NextFunction){
        try{

            const {usuarioId} = req.params
            const incomes = await Income.getIncome(Number(usuarioId));
            res.json({message:'Ingesos del usuario', incomes});
        } catch(error){
            res.status(500).json({error:error})
            next(error)
        }
    } 

    static async deletIncome(req:Request, res:Response,next:NextFunction){
        try {
            const {id} = req.params;
            const income = await Income.getIncomeForId(Number(id));
            if(!income){
                return res.status(400).json({message:`No se encontro ningun ingreso relaciondo a ${id}`})
            }
            await Income.deleteIncome(Number(id));
            res.json({message:"El ingreso fue eliminado con exito"})
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

}