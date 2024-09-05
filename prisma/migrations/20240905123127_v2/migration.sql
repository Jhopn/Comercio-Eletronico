/*
  Warnings:

  - You are about to drop the column `criadoEm` on the `Pedidos` table. All the data in the column will be lost.
  - You are about to drop the column `produtoId` on the `Pedidos` table. All the data in the column will be lost.
  - You are about to drop the column `quantidade` on the `Pedidos` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PedidoStatus" AS ENUM ('PENDENTE', 'COMPLETO', 'ENTREGA');

-- DropForeignKey
ALTER TABLE "Pedidos" DROP CONSTRAINT "Pedidos_produtoId_fkey";

-- AlterTable
ALTER TABLE "Pedidos" DROP COLUMN "criadoEm",
DROP COLUMN "produtoId",
DROP COLUMN "quantidade",
ADD COLUMN     "status" "PedidoStatus" NOT NULL DEFAULT 'PENDENTE';

-- CreateTable
CREATE TABLE "pedidosProdutos" (
    "id" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "pedidoId" TEXT,
    "produtoId" TEXT,

    CONSTRAINT "pedidosProdutos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pedidosProdutos" ADD CONSTRAINT "pedidosProdutos_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedidos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedidosProdutos" ADD CONSTRAINT "pedidosProdutos_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
