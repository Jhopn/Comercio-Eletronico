/*
  Warnings:

  - Added the required column `endereco` to the `Clientes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Clientes" ADD COLUMN  "endereco" TEXT NOT NULL;


