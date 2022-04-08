/*
  Warnings:

  - You are about to drop the column `time_of_hearth` on the `Torcedor` table. All the data in the column will be lost.
  - You are about to drop the column `time_of_life` on the `Torcedor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Torcedor" DROP COLUMN "time_of_hearth",
DROP COLUMN "time_of_life",
ADD COLUMN     "time_of_kokoro" TEXT[];
