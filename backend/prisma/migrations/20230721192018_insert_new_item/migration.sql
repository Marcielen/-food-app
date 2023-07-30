/*
  Warnings:

  - Added the required column `idOrder` to the `orderRegistration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orderRegistration" ADD COLUMN     "idOrder" TEXT NOT NULL;
