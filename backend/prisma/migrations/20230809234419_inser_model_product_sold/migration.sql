/*
  Warnings:

  - You are about to drop the column `hasSale` on the `OrderProduct` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OrderProduct" DROP COLUMN "hasSale";

-- CreateTable
CREATE TABLE "productSold" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "productSold_pkey" PRIMARY KEY ("id")
);
