/*
  Warnings:

  - Added the required column `time_of_life` to the `Torcedor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Torcedor" ADD COLUMN     "time_of_life" TEXT NOT NULL,
ALTER COLUMN "time_of_hearth" SET NOT NULL,
ALTER COLUMN "time_of_hearth" SET DATA TYPE TEXT;
