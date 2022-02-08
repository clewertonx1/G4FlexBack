/*
  Warnings:

  - You are about to drop the column `FaixaEtaria` on the `Torcedor` table. All the data in the column will be lost.
  - You are about to drop the column `SocioTorcedor` on the `Torcedor` table. All the data in the column will be lost.
  - Added the required column `faixa_etaria` to the `Torcedor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Torcedor" DROP COLUMN "FaixaEtaria",
DROP COLUMN "SocioTorcedor",
ADD COLUMN     "faixa_etaria" TEXT NOT NULL,
ADD COLUMN     "socio_torcedor" BOOLEAN NOT NULL DEFAULT false;
