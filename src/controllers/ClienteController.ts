import { prisma } from "../connection/prisma";
import { Request, Response} from "express";
import bcrypt from "bcryptjs";

export class ClienteController{
    public async criarCliente(req: Request, res: Response){
        const {nome, email, senha} = req.body;

        try {
            const isEmail = await prisma.clientes.findUnique({
                where:{
                    email
                }
            });

            if(isEmail) return res.status(402).json({message: 'Erro nas credenciais'})
            

            const senhaCriptografada = await bcrypt.hash(senha, 15)

            const cliente = await prisma.clientes.create({
                data: {
                    nome,
                    email,
                    senha: senhaCriptografada
                }
            });

            return res.status(201).json({message: 'Cliente criado com sucesso', cliente})
            
        } catch (error) {
            return res.status(400).json({
                message: `Erro ao criar perfil do cliente`,
                error: error
            })
        }
    }
    public async atualizarCliente(req: Request, res: Response){
        const { id } = req.params;
        const {nome, email, senha} = req.body;

        try {
            const isEmail = await prisma.clientes.findUnique({
                where:{
                    email
                }
            });

            if(isEmail) return res.status(402).json({message: 'Erro nas credenciais'})

            const cliente = await prisma.clientes.update({
                where: {
                    id,
                },
                data:{
                    nome,
                    email,
                    senha
                }
            });

            return res.status(201).json({cliente});
            
        } catch (error) {
            return res.status(400).json({
                message: `Erro ao atualizar o perfil do cliente`,
                error: error
            })
        }
    }

    public async listarClientes(req: Request, res: Response){
        try {
        const clientes = await prisma.clientes.findMany({
            select:{
                id: true,
                nome: true,
                email: true,
                Pedidos: true
            }
        });

        return res.status(201).json(clientes);
        } catch (error) {
            return res.status(400).json({
                message: `Erro ao listar clientes`,
                error: error
            });  
        }
    }

    public async listarCliente(req: Request, res: Response){
        const { id } = req.params;
        try {
            const cliente = await prisma.clientes.findUnique({
                where:{
                    id,
                }
            });

            return res.status(201).json(cliente);
        } catch (error) {
            return res.status(400).json({
                message: `Erro ao encontrar cliente`,
                error: error
            });
        }
    }

    public async excluirCliente(req: Request, res: Response){
        const { id } = req.params;

        try {
            const cliente = await prisma.clientes.delete({
                where:{
                    id,
                }
            });

            return res.status(201).json({ message: 'Conta do cliente excluída', cliente})
        } catch (error) {
            return res.status(400).json({
                message: `Erro ao deletar cliente`,
                error: error
            });
        }
    }
         
}