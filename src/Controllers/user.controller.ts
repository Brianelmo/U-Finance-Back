import { NextFunction, Request, Response } from "express";
import { User } from "../services/user.services";

export class UserController {
  static async CrearUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { nombre, email, password } = req.body;
      const newUser = await User.createUsuario(nombre, email, password);
      res
        .status(201)
        .json({ message: "Usuario creado con exito", usuario: newUser });
      console.log(newUser);
    } catch (error) {
      res.status(400).json({ error: error });
      next(error);
    }
  }

  static async Login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const Valido = await User.verificarPassword(email, password);

      if (!Valido)
        return res.status(401).json({ error: "Credenciales incorrectas" });

      res.json({ message: "Inicio de sesion exitoso", Valido});
    } catch (error) {
      res.status(400).json({ error: error });
      next(error);
    }
  }
}
