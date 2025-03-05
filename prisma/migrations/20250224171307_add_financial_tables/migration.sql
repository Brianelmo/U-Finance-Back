/*
  Warnings:

  - You are about to drop the column `usuario` on the `usuario` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Usuario_usuario_key` ON `usuario`;

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `usuario`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `IngresosUsuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuarioId` INTEGER NOT NULL,
    `entradaNum` DOUBLE NOT NULL,
    `fechaEntrada` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `motivoEntrada` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GastosUsuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuarioId` INTEGER NOT NULL,
    `gastoNum` DOUBLE NOT NULL,
    `fechaGasto` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `motivoGasto` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ahorro` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuarioId` INTEGER NOT NULL,
    `objetivoAhorro` DOUBLE NOT NULL,

    UNIQUE INDEX `Ahorro_usuarioId_key`(`usuarioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_email_key` ON `Usuario`(`email`);

-- AddForeignKey
ALTER TABLE `IngresosUsuario` ADD CONSTRAINT `IngresosUsuario_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GastosUsuario` ADD CONSTRAINT `GastosUsuario_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ahorro` ADD CONSTRAINT `Ahorro_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
