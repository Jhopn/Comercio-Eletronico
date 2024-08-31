import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../connection/prisma";

export const SECRET_KEY = "1e186e342272db5cdcd4ead6e1e05d55896de5ca0790a9720df5b7c6fca91c07";

export class SingInController{
    public async singIn(req: Request, res: Response){
        const { email, senha} = req.body;

        try {
        
            const isEmail = await prisma.clientes.findFirst({
                where:{
                    email,
                }
            });

            if(!isEmail) return res.status(201).json({message: 'Credenciais Invalidas'});

            const senhaCorreta  = bcrypt.compare(senha, isEmail.senha);

            if(!senhaCorreta) return  res.status(201).json({message: 'Credenciais Invalidas'});
            
            const token = jwt.sign(
                {
                    id: isEmail.id,
                    nome: isEmail.nome,
                    email: isEmail.email
                },
                SECRET_KEY
            );

            return res.status(201).json({token: token});

        } catch (error) {
            return res.json({
                error: "Erro ao logar usuário",
                message: error,
              });
        }
    }
}