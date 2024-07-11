-- CreateTable
CREATE TABLE `Exame` (
    `idExame` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeExame` VARCHAR(191) NOT NULL,
    `nomeImagem` VARCHAR(191) NOT NULL,
    `urlImagem` VARCHAR(191) NOT NULL,
    `usuarioIdUsuario` INTEGER NOT NULL,

    PRIMARY KEY (`idExame`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Exame` ADD CONSTRAINT `Exame_usuarioIdUsuario_fkey` FOREIGN KEY (`usuarioIdUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;
