-- CreateTable
CREATE TABLE "contato" (
    "ID" SERIAL NOT NULL,
    "NOME" VARCHAR(100) NOT NULL,
    "IDADE" INTEGER NOT NULL,

    CONSTRAINT "contato_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "telefone" (
    "ID" SERIAL NOT NULL,
    "IDCONTATO" INTEGER NOT NULL,
    "NUMERO" VARCHAR(16) NOT NULL,

    CONSTRAINT "telefone_pkey" PRIMARY KEY ("ID")
);

-- AddForeignKey
ALTER TABLE "telefone" ADD CONSTRAINT "telefone_fk0" FOREIGN KEY ("IDCONTATO") REFERENCES "contato"("ID") ON DELETE CASCADE ON UPDATE NO ACTION;
