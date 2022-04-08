/*
  Warnings:

  - You are about to drop the column `time_of_kokoro` on the `Torcedor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Torcedor" DROP COLUMN "time_of_kokoro",
ADD COLUMN     "time_of_hearth" TEXT[];
