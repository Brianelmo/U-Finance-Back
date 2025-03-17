import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class Expense {
  static async createGasto(
    motivoGasto: string,
    usuarioId: number,
    gastoNum: number
  ) {
    try {
      // Verificar si el usuario existe
      const usuario = await prisma.usuario.findUnique({
        where: { id: usuarioId },
      });

      if (!usuario) {
        throw new Error(`Usuario con id ${usuarioId} no encontrado`);
      }

      const nuevoGasto = await prisma.gastosUsuario.create({
        data: {
          motivoGasto,
          usuarioId,
          gastoNum,
        },
      });
      console.log(nuevoGasto);
      return nuevoGasto;
    } catch (error) {
      console.log("Error al crear gasto", error);
      throw error;
    }
  }

  static async obtenerGastosUsuario(usuarioId: number) {
    try {
      return await prisma.gastosUsuario.findMany({
        where: { usuarioId },
      });
    } catch (error) {
      console.log(error);
      throw new Error(`Error al obtener los gastos del usuario ${error}`);
    }
  } 

  static async getExpenseForId(id:number){
    try{
      return await prisma.gastosUsuario.findUnique({
        where: { id:Number(id) },
      })
    } catch(error) {
      console.log("error al obtener el gasto",error)
      throw new Error(`Error al obtener el gasto: ${error}`)
    }
  }

  static async deleteExpense(id:number) {
    try {
      const gasto = await prisma.gastosUsuario.findUnique({
        where: {id}
      })
   
      if(!gasto){
        console.log('gasto no encontrado');
        throw new Error('gasto no encontrado')
      } 
      await prisma.gastosUsuario.delete({where:{id}});
    } catch (error) {
      console.log(error);
      throw new Error(`error al querer eliminar un gasto ${error}`);
    }
  } 
  
  static async editExpense(id:number, gastoNum:number, motivoGasto:string){
      try {
        const updateExpense =  await prisma.gastosUsuario.update({
          where: {id:Number(id)} ,
          data:{gastoNum, motivoGasto},
        })
        return updateExpense
      } catch (error) {
        console.log(error);
        throw new Error(`Error al querer editar un gasto ${error}`);
      }
  }
}
