/*
  Warnings:

  - Added the required column `idUser` to the `productSold` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "productSold" ADD COLUMN     "idUser" TEXT NOT NULL;
