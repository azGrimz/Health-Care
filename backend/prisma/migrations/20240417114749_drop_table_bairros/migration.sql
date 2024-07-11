/*
  Warnings:

  - You are about to drop the column `bairrosId` on the `empresa` table. All the data in the column will be lost.
  - You are about to drop the `bairros` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bairroEmpresa` to the `Empresa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `empresa` DROP FOREIGN KEY `Empresa_bairrosId_fkey`;

-- AlterTable
ALTER TABLE `empresa` DROP COLUMN `bairrosId`,
    ADD COLUMN `bairroEmpresa` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `bairros`;
