import { prisma } from "../connection/prisma";
import { Request, Response } from "express";

interface Produto {
  produtoId: string;
  quantidade: number;
}

export class PedidosControllers {
    public async criarPedido(req: Request, res: Response) {
        const { clienteId, produtos } = req.body;
    
        try {
            const produtosDados = await prisma.produtos.findMany({
                where: { id: { in: produtos.map((p: Produto) => p.produtoId) } },
            });
    
            const pedido = await prisma.pedidos.create({
                data: {
                    clienteId: clienteId,
                    pedidoProdutos: {
                        create: produtosDados.map(product => ({
                            produtoId: product.id,
                            quantidade: produtos.find((p: Produto) => p.produtoId === product.id)?.quantidade || 0
                        }))
                    },
                },
                include: {
                    pedidoProdutos: {
                        select: {
                            id: true,
                            quantidade: true
                        }
                    },
                    Clientes: {
                        select: {
                            nome: true
                        }
                    }
                }
            });


    
            return res.status(201).json({ message: 'Pedido criado!', pedido });
    
        } catch (error) {
            return res.status(400).json({
                message: `Erro ao criar pedido do cliente`,
                error: error
            });
        }
    }
    

    public async listarPedidos(req: Request, res: Response) {
        try {
            const pedidos = await prisma.pedidos.findMany({
                include: {
                    Clientes: {
                        select: {
                            nome: true,
                            email: true,
                        }
                    },
                    pedidoProdutos: {
                        select: {
                            quantidade: true,
                            Produtos: {
                                select: {
                                    nome: true,
                                    preco: true
                                }
                            }
                        }
                    }
                }
            });
    
            return res.status(200).json({ pedidos });
    
        } catch (error) {
            return res.status(400).json({
                message: 'Erro ao listar pedidos',
                error: error
            });
        }
    }
    
    public async listarPedido(req: Request, res: Response) {
        const { id } = req.params;
        
        try {
            const pedido = await prisma.pedidos.findFirst({
                where: { id },
                include: {
                    Clientes: {
                        select: {
                            nome: true,
                            email: true,
                        }
                    },
                    pedidoProdutos: {
                        select: {
                            quantidade: true,
                            Produtos: {
                                select: {
                                    nome: true,
                                    preco: true
                                }
                            }
                        }
                    }
                }
            });
    
            return res.status(200).json({ pedido });
    
        } catch (error) {
            return res.status(400).json({
                message: 'Erro ao listar pedido',
                error: error
            });
        }
    }
    

    public async atualizarPedido(req: Request, res: Response) {
        const { id } = req.params;
        const { quantidade, produtoId, clienteId } = req.body;
    
        try {
            const pedidoExistente = await prisma.pedidos.findUnique({
                where: { id }
            });
    
            const pedidoAtualizado = await prisma.pedidos.update({
                where: { id },
                data: {
                    clienteId: clienteId || pedidoExistente?.clienteId, 
                }
            });
    
            if (produtoId && quantidade) {
                await prisma.pedidosProdutos.updateMany({
                    where: {
                        pedidoId: id,
                        produtoId: produtoId 
                    },
                    data: {
                        quantidade
                    }
                });
            }
    
            return res.status(200).json({ message: 'Pedido atualizado', pedidoAtualizado });
    
        } catch (error) {
            return res.status(400).json({
                message: 'Erro ao atualizar pedido',
                error: error
            });
        }
    }
    

    public async deletarPedido(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const pedido = await prisma.pedidos.delete({
                where: {
                    id,
                }
            });

            return res.status(201).json({ message: 'Pedido deletado!', pedido });

        } catch (error) {
            return res.status(400).json({
                message: `Erro ao deletar pedido do cliente`,
                error: error
            });
        }
    }

}