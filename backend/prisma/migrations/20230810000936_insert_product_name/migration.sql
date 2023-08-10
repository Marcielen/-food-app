/*
  Warnings:

  - Added the required column `product_name` to the `productSold` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "productSold" ADD COLUMN     "product_name" TEXT NOT NULL;
