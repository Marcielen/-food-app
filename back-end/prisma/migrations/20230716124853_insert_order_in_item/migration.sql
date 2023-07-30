/*
  Warnings:

  - Added the required column `order` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "items" ADD COLUMN     "order" INTEGER NOT NULL;
