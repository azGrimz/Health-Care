/*
  Warnings:

  - A unique constraint covering the columns `[emailEmpresa]` on the table `Empresa` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpnjEmpresa]` on the table `Empresa` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Empresa_emailEmpresa_key` ON `Empresa`(`emailEmpresa`);

-- CreateIndex
CREATE UNIQUE INDEX `Empresa_cpnjEmpresa_key` ON `Empresa`(`cpnjEmpresa`);
