/*
  Warnings:

  - You are about to drop the column `cpf` on the `Torcedor` table. All the data in the column will be lost.
  - You are about to drop the column `faixa_etaria` on the `Torcedor` table. All the data in the column will be lost.
  - You are about to drop the column `idade` on the `Torcedor` table. All the data in the column will be lost.
  - You are about to drop the column `sexo` on the `Torcedor` table. All the data in the column will be lost.
  - You are about to drop the column `socio_torcedor` on the `Torcedor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Torcedor" DROP COLUMN "cpf",
DROP COLUMN "faixa_etaria",
DROP COLUMN "idade",
DROP COLUMN "sexo",
DROP COLUMN "socio_torcedor";
