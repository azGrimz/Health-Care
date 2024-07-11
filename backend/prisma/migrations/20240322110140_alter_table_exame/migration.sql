/*
  Warnings:

  - You are about to drop the column `usuarioIdUsuario` on the `exame` table. All the data in the column will be lost.
  - Added the required column `idUsuario` to the `Exame` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `exame` DROP FOREIGN KEY `Exame_usuarioIdUsuario_fkey`;

-- AlterTable
ALTER TABLE `exame` DROP COLUMN `usuarioIdUsuario`,
    ADD COLUMN `idUsuario` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Exame` ADD CONSTRAINT `Exame_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;
