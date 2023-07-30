/*
  Warnings:

  - You are about to drop the column `search` on the `OrderProduct` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OrderProduct" DROP COLUMN "search";

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "search" TEXT;
