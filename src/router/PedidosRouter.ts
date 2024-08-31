import { Router } from "express";
import { PedidosControllers } from '../controllers/PedidosControllers';
import { authMiddleware } from '../middlewares/auth';
const router = Router();
const pedidosControllers = new PedidosControllers();

router.get('/pedidos/:id', pedidosControllers.listarPedido)
router.get('/pedidos', pedidosControllers.listarPedidos)
router.post('/pedidos',  authMiddleware, pedidosControllers.criarPedido)
router.put('/pedidos/:id',  authMiddleware, pedidosControllers.atualizarPedido)
router.delete('/pedidos/:id',  authMiddleware, pedidosControllers.deletarPedido)

export { router as RouterPedidos}