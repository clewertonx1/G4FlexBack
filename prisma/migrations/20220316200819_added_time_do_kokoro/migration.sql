/*
  Warnings:

  - Added the required column `time_do_kokoro` to the `Torcedor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Torcedor" ADD COLUMN     "time_do_kokoro" TEXT NOT NULL;
