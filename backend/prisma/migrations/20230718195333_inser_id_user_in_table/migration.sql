/*
  Warnings:

  - Added the required column `idUser` to the `Buy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idUser` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idUser` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idUser` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Buy" ADD COLUMN     "idUser" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "idUser" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "items" ADD COLUMN     "idUser" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "idUser" TEXT NOT NULL;
