import { Router } from "express";
import { ClienteController } from '../controllers/ClienteController';
import { SingInController } from "../controllers/singIn";
import { authMiddleware } from '../middlewares/auth'
const clienteController = new ClienteController();
const singIn = new SingInController();
const router = Router();

router.post('/login', singIn.singIn);

router.get('/clientes/:id', clienteController.listarCliente);
router.get('/clientes', clienteController.listarClientes);
router.post('/clientes', clienteController.criarCliente);
router.put('/clientes:id', authMiddleware, clienteController.atualizarCliente);
router.delete('/clientes/:id', authMiddleware, clienteController.excluirCliente);


export { router as RouterCliente}

