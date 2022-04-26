-- CreateTable
CREATE TABLE "Funcionarios" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,

    CONSTRAINT "Funcionarios_pkey" PRIMARY KEY ("id")
);
