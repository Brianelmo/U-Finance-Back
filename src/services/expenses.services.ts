import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); 

export class Expense {
  static async createGasto(motivoGasto: string, usuarioId: number, gastoNum: number) {
    try {
      // Verificar si el usuario existe
      const usuario = await prisma.usuario.findUnique({
        where: { id: usuarioId }
      });

      if (!usuario) {
        throw new Error(`Usuario con id ${usuarioId} no encontrado`);
      }

      const nuevoGasto = await prisma.gastosUsuario.create({
        data: {
          motivoGasto,
          usuarioId,
          gastoNum
        }
      });
      console.log(nuevoGasto);
      return nuevoGasto;
    } catch (error) {
      console.log('Error al crear gasto', error);
      throw error;  
    } 
  }

  static async obtenerGastosUsuario(usuarioId: number) {
    try{
        return await prisma.gastosUsuario.findMany({
            where: {usuarioId}
        })
    } catch(error){
        console.log(error)
        throw new Error(`Error al obtener los gastos del usuario ${error}`);
    }
  }
}