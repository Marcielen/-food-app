/*
  Warnings:

  - Added the required column `price` to the `pay` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pay" ADD COLUMN     "price" INTEGER NOT NULL;
