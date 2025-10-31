/*
  Warnings:

  - You are about to drop the column `txRef` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `booking` table. All the data in the column will be lost.
  - You are about to alter the column `amount` on the `booking` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - Added the required column `customerEmail` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `Booking_userId_fkey`;

-- DropIndex
DROP INDEX `Booking_userId_fkey` ON `booking`;

-- AlterTable
ALTER TABLE `booking` DROP COLUMN `txRef`,
    DROP COLUMN `userId`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `customerEmail` VARCHAR(191) NOT NULL,
    MODIFY `amount` DOUBLE NOT NULL,
    ALTER COLUMN `status` DROP DEFAULT;

-- CreateTable
CREATE TABLE `Payment` (
    `id` VARCHAR(191) NOT NULL,
    `reference` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `propertyId` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Payment_reference_key`(`reference`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
