/*
  Warnings:

  - Added the required column `dataCriacao` to the `Exame` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `exame` ADD COLUMN `dataCriacao` VARCHAR(191) NOT NULL;
