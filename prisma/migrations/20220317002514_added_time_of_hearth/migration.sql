/*
  Warnings:

  - You are about to drop the column `time_do_kokoro` on the `Torcedor` table. All the data in the column will be lost.
  - The `time_of_hearth` column on the `Torcedor` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Torcedor" DROP COLUMN "time_do_kokoro",
DROP COLUMN "time_of_hearth",
ADD COLUMN     "time_of_hearth" TEXT[];
