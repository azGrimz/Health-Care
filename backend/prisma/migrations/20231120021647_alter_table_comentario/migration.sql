/*
  Warnings:

  - You are about to drop the column `idStatus` on the `comentario` table. All the data in the column will be lost.
  - You are about to drop the `status` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `comentario` DROP FOREIGN KEY `Comentario_idStatus_fkey`;

-- AlterTable
ALTER TABLE `comentario` DROP COLUMN `idStatus`;

-- DropTable
DROP TABLE `status`;
