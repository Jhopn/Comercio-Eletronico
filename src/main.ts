import express from "express";
import { RouterCliente } from "./router/ClienteRouter";
import { RouterPedidos } from "./router/PedidosRouter";
import { RouterProduto } from "./router/ProdutoRouter";


const app = express();
app.use(express.json());


app.use(RouterCliente)
app.use(RouterPedidos)
app.use(RouterProduto)

app.listen(3000, () => console.log('Servidor online'));