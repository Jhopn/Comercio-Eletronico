import { Router } from "express";
import { ProdutoController } from '../controllers/ProdutoController';

const produtoController = new ProdutoController();
const router = Router();

router.get('/produtos/:id', produtoController.listarProduto)
router.get('/produtos', produtoController.listarProdutos)
router.post('/produtos', produtoController.criarProduto)
router.put('/produtos/:id', produtoController.atualizarProduto)
router.delete('/produtos:id', produtoController.deleteProduto)

export { router as RouterProduto}