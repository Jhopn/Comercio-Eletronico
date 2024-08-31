import { prisma } from "../connection/prisma";
import { Request, Response } from "express";

export class ProdutoController {
    public async criarProduto(req: Request, res: Response) {
        const { nome, descricao, quantidade, preco, imagem } = req.body;

        try {
            const nameUnico = await prisma.produtos.findFirst({
                where: {
                    nome
                }
            });

            if(nameUnico) return res.status(403).json({message: 'Nome de produto existente'});

            const produto = await prisma.produtos.create({
                data: {
                    nome,
                    descricao,
                    quantidade,
                    preco,
                    imagem
                }
            });

            return res.status(201).json({
                message: 'Produto criado com sucesso',
                data: produto
            });

        } catch (error) {
            return res.status(401).json({
                message: 'Erro ao criar o produto',
                error: error
            });
        }
    }

    public async listarProdutos(req: Request, res: Response) {
        try {
            const produtos = await prisma.produtos.findMany({})

            return res.status(201).json({ produtos });

        } catch (error) {
            return res.status(401).json({
                message: 'Erro ao listar os produtos',
                error: error
            });
        }
    }

    public async listarProduto(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const produto = await prisma.produtos.findFirst({
                where: {
                    id,
                }
            });

            return res.status(201).json(produto)

        } catch (error) {
            return res.status(401).json({
                message: 'Erro ao listar o produto',
                error: error
            });
        }
    }

    public async atualizarProduto(req: Request, res: Response) {
        const { id } = req.params;
        const { nome, descricao, quantidade, preco, imagem } = req.body;
        try {
            const produto = await prisma.produtos.update({
                where: {
                    id,
                },
                data: {
                    nome,
                    descricao,
                    quantidade,
                    preco,
                    imagem,
                }
            })

            return res.status(201).json(produto);

        } catch (error) {
            return res.status(401).json({
                message: 'Erro ao atualizar o produto',
                error: error
            });
        }
    }

    public async deleteProduto(req: Request, res: Response){
        const { id } = req.params;

        try {
            const produto = await prisma.produtos.delete({
                where:{
                    id,
                }
            })

            return res.status(201).json({message: 'Produto deletado com sucesso!', produto})
            
        } catch (error) {
            return res.status(401).json({
                message: 'Erro ao deletar o produto',
                error: error
            });
        }

    }
}