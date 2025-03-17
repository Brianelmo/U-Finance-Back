import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class Income {
    static async createIngreso(entradaNum:number, usuarioId:number, motivoEntrada:string){
        try {
            const usuario = await prisma.usuario.findUnique({
                where: {id: usuarioId}
            })
            if(!usuario){
                throw new Error(`Usuario con id ${usuarioId} no encontrado`);
            }
            
            const nuevoIngreso = await prisma.ingresosUsuario.create({
                    data:{
                        usuarioId,
                        motivoEntrada,
                        entradaNum
                    }
            })
            console.log(nuevoIngreso);
            return nuevoIngreso;
        } catch (error) {
            throw new Error(`Error al crear ingreso ${error}`);
        }
    } 

    static async getIncome(usuarioId:number){
        try{
            return await prisma.ingresosUsuario.findMany({
                where:{usuarioId}
            }) 
        } catch(error){
            console.log(error);
            throw new Error(`Error al obtener ingresos del usuario ${error}`)
        }
    } 

    static async editIncome(id:number){
        
    }

    static  async getIncomeForId(id:number){
        try {
            return await prisma.ingresosUsuario.findUnique({
                where:{id},
            })
        } catch (error) {
            console.log(error);
            throw new Error(`Error al obtener el ingreso ${error}`);
        } 
    } 

    static async deleteIncome(id:number){
        try {
            const income = await prisma.ingresosUsuario.findUnique({
                where:{id}
            })
            if(!income){
                throw new Error('Ingreso no encontrado')
            }
            await prisma.ingresosUsuario.delete({
                where:{id}
            })
        } catch (error) {
            console.log(error);
            throw new Error(`Error al intentar borrar un ingreso ${error}`);
        } 
    }
}

