import { prisma } from "../connection/prisma";
import { Request, Response } from "express";

export class PedidosControllers {
    public async criarPedido(req: Request, res: Response) {
        const { clienteId, produtos } = req.body;

        try {
            // const productsByDatabase = await prisma.produtos.findMany({
            //   where: { id: { in: produtos.map(p => p.produtoId) } },
            // });

            // const pedido = await prisma.pedidos.create(
            //     {
            //         data: {
            //           clienteId: clienteId,
            //           pedidoProdutos: {
            //             create: productsByDatabase.map(product => ({
            //               produtoId: product.id,
            //               quantidade: produtos.find(p => p.product === product.id)?.amount || 0
            //             }))
            //           },
            //         },
            //         include: {
            //           pedidoProdutos: {
            //             select: {
            //               id: true,
            //               quantidade: true
            //             }
            //           },
            //           Clientes: {
            //             select: {
            //               nome: true
            //             }
            //           }
            //         }
            //       }
            // );
        

            return res.status(201).json({ message: 'Pedido criado!', pedido });

        } catch (error) {
            return res.status(400).json({
                message: `Erro ao criar pedido do cliente`,
                error: error
            })
        }
    }

    public async listarPedidos(req: Request, res: Response) {
        try {
            const pedidos = await prisma.pedidos.findMany({});

            return res.status(201).json({ pedidos });

        } catch (error) {
            return res.status(400).json({
                message: `Erro ao listar pedidos`,
                error: error
            });
        }
    }

    public async listarPedido(req: Request, res: Response) {
        const { id } = req.params;
        try {

            const pedido = await prisma.pedidos.findFirst({
                where: {
                    id
                }
            });

            return res.status(201).json({ pedido })

        } catch (error) {
            return res.status(400).json({
                message: `Erro ao listar pedidos do cliente`,
                error: error
            });
        }
    }

    public async atualizarPedido(req: Request, res: Response) {
        const { id } = req.params;
        const { quantidade, produtoId, clienteId } = req.body;

        try {
            const pedido = await prisma.pedidos.update({
                where: {
                    id,
                },
                data: {
                    quantidade, produtoId, clienteId
                }
            });

            return res.status(201).json({ message: 'Pedido atualizado', pedido })

        } catch (error) {
            return res.status(400).json({
                message: `Erro ao atualizar pedido do cliente`,
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