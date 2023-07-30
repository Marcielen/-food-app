/*
  Warnings:

  - Added the required column `label` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" ADD COLUMN     "label" TEXT NOT NULL;
