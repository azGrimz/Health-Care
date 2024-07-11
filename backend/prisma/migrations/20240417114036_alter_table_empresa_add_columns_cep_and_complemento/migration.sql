/*
  Warnings:

  - Added the required column `cepEmpresa` to the `Empresa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `complementoEmpresa` to the `Empresa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `empresa` ADD COLUMN `cepEmpresa` VARCHAR(191) NOT NULL,
    ADD COLUMN `complementoEmpresa` VARCHAR(191) NOT NULL;
