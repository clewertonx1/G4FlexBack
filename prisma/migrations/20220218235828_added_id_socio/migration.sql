/*
  Warnings:

  - Added the required column `id_socio` to the `Torcedor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Torcedor" ADD COLUMN     "id_socio" TEXT NOT NULL;
