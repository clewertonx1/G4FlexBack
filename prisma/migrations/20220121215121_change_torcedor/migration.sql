/*
  Warnings:

  - Added the required column `FaixaEtaria` to the `Torcedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idade` to the `Torcedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sexo` to the `Torcedor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Torcedor" ADD COLUMN     "FaixaEtaria" TEXT NOT NULL,
ADD COLUMN     "SocioTorcedor" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "idade" INTEGER NOT NULL,
ADD COLUMN     "sexo" TEXT NOT NULL;
