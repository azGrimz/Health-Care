/*
  Warnings:

  - Added the required column `latitude` to the `Empresa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Empresa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `empresa` ADD COLUMN `latitude` VARCHAR(191) NOT NULL,
    ADD COLUMN `longitude` VARCHAR(191) NOT NULL;
