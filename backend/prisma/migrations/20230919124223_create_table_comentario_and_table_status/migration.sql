-- CreateTable
CREATE TABLE `Comentario` (
    `idComentario` INTEGER NOT NULL AUTO_INCREMENT,
    `conteudoComentario` VARCHAR(191) NOT NULL,
    `idUsuario` INTEGER NOT NULL,
    `idStatus` INTEGER NOT NULL,
    `idEmpresa` INTEGER NOT NULL,

    PRIMARY KEY (`idComentario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Status` (
    `idStatus` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeStatus` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idStatus`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Comentario` ADD CONSTRAINT `Comentario_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comentario` ADD CONSTRAINT `Comentario_idStatus_fkey` FOREIGN KEY (`idStatus`) REFERENCES `Status`(`idStatus`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comentario` ADD CONSTRAINT `Comentario_idEmpresa_fkey` FOREIGN KEY (`idEmpresa`) REFERENCES `Empresa`(`idEmpresa`) ON DELETE RESTRICT ON UPDATE CASCADE;
