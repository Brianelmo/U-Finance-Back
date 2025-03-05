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
                        entradaNum,
                        usuarioId,
                        motivoEntrada
                    }
            })
            console.log(nuevoIngreso);
            return nuevoIngreso;
        } catch (error) {
            throw new Error(`Error al crear ingreso ${error}`);
        }
    }
}

