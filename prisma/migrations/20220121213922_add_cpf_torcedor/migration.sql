/*
  Warnings:

  - Added the required column `cpf` to the `Torcedor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Torcedor" ADD COLUMN     "cpf" TEXT NOT NULL;
