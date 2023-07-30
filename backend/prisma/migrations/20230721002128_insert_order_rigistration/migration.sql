/*
  Warnings:

  - You are about to drop the column `update_at` on the `orderRegistration` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orderRegistration" DROP COLUMN "update_at",
ADD COLUMN     "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;
