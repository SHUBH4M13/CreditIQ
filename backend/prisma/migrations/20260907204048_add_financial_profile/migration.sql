-- AlterTable
ALTER TABLE `users` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- CreateTable
CREATE TABLE `financial_profiles` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `userId` BIGINT UNSIGNED NOT NULL,
    `age` INTEGER NULL,
    `income` DECIMAL(12, 2) NULL,
    `occupation` VARCHAR(100) NULL,
    `employmentStatus` VARCHAR(50) NULL,
    `creditScore` INTEGER NULL,
    `existingLoans` INTEGER NULL,
    `existingCreditCards` INTEGER NULL,
    `monthlySpending` DECIMAL(12, 2) NULL,
    `spendingCategories` JSON NULL,
    `preferredBenefits` JSON NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL,

    UNIQUE INDEX `financial_profiles_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `financial_profiles` ADD CONSTRAINT `financial_profiles_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
