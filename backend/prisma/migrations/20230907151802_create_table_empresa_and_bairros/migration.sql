/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `Empresa` (
    `idEmpresa` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeEmpresa` VARCHAR(191) NOT NULL,
    `emailEmpresa` VARCHAR(191) NOT NULL,
    `cpnjEmpresa` VARCHAR(191) NOT NULL,
    `telefoneEmpresa` INTEGER NOT NULL,
    `bairrosId` INTEGER NOT NULL,
    `enderecoEmpresa` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idEmpresa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bairros` (
    `idBairro` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeBairro` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idBairro`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Empresa` ADD CONSTRAINT `Empresa_bairrosId_fkey` FOREIGN KEY (`bairrosId`) REFERENCES `Bairros`(`idBairro`) ON DELETE RESTRICT ON UPDATE CASCADE;
