import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const salt = 10;

export class User {
  static async createUsuario(nombre: string, email: string, password: string) {
    try {
      const hashPass = await bcrypt.hash(password, salt);

      const nuevoUsuario = await prisma.usuario.create({
        data: {
          nombre,
          email,
          password: hashPass,
        },
      });
      return nuevoUsuario;
    } catch (error) {
      throw new Error(`Error al crear el usuario" ${error}`);
    }
  } 

  static async obtenerUser(email:string){
    try {
        return await prisma.usuario.findUnique({
            where:{email},
        });
    } catch (error) {
        throw new Error(`Error al obtener el usuario ${error}`)
    }
  }


  static async verificarPassword(email:string, password:string){
    try {
        const usuario = await this.obtenerUser(email);
        if(!usuario) throw new Error('usuario no encontrado')

        const valida = await bcrypt.compare(password, usuario.password)
        if(valida){
          return {id: usuario.id, nombre:usuario.nombre}
        }else {
          throw new Error('contraseña incorrecta');
        }
    } catch (error) {
        throw new Error(`error al verificar la contraseña ${error}`)
    }
  }


}
