-- CreateTable
CREATE TABLE `Especialidade` (
    `idEspecialidade` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeEspecialidade` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idEspecialidade`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DisponibilidadeEspecialidade` (
    `idDisponibilidade` INTEGER NOT NULL AUTO_INCREMENT,
    `quantidadeEspecialidade` INTEGER NOT NULL,
    `idEspecialidade` INTEGER NOT NULL,
    `idEmpresa` INTEGER NOT NULL,

    PRIMARY KEY (`idDisponibilidade`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DisponibilidadeEspecialidade` ADD CONSTRAINT `DisponibilidadeEspecialidade_idEspecialidade_fkey` FOREIGN KEY (`idEspecialidade`) REFERENCES `Especialidade`(`idEspecialidade`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DisponibilidadeEspecialidade` ADD CONSTRAINT `DisponibilidadeEspecialidade_idEmpresa_fkey` FOREIGN KEY (`idEmpresa`) REFERENCES `Empresa`(`idEmpresa`) ON DELETE RESTRICT ON UPDATE CASCADE;
