/*
  Warnings:

  - You are about to drop the column `amount` on the `items` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "items" DROP COLUMN "amount",
DROP COLUMN "product_id";
