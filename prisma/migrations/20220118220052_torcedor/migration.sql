-- CreateTable
CREATE TABLE "Torcedor" (
    "id" SERIAL NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "cpf" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "idade" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "socio_torcedor" BOOLEAN NOT NULL DEFAULT false,
    "faixa_etaria" TEXT NOT NULL,

    CONSTRAINT "Torcedor_pkey" PRIMARY KEY ("id")
);
