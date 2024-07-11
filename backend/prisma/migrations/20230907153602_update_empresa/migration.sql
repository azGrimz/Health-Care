/*
  Warnings:

  - Added the required column `senhaEmpresa` to the `Empresa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `empresa` ADD COLUMN `senhaEmpresa` VARCHAR(191) NOT NULL;
