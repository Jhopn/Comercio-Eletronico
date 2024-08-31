import { Request, Response } from 'express';
export declare class ClienteController {
    criarCliente(req: Request, res: Response): Promise<any>;
    atualizarCliente(req: Request, res: Response): Promise<any>;
    listarClientes(req: Request, res: Response): Promise<any>;
    listarCliente(req: Request, res: Response): Promise<any>;
    excluirCliente(req: Request, res: Response): Promise<any>;
}
