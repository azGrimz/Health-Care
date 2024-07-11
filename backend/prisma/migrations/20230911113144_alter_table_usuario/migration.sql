/*
  Warnings:

  - A unique constraint covering the columns `[emailUsuario]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roleUsuario` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `roleUsuario` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_emailUsuario_key` ON `Usuario`(`emailUsuario`);
