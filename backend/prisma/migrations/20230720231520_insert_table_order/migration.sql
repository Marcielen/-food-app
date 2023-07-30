/*
  Warnings:

  - You are about to drop the column `order_id` on the `items` table. All the data in the column will be lost.
  - Added the required column `amount` to the `OrderProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `active` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderProduct" DROP CONSTRAINT "OrderProduct_product_id_fkey";

-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_order_id_fkey";

-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_product_id_fkey";

-- AlterTable
ALTER TABLE "OrderProduct" ADD COLUMN     "amount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "items" DROP COLUMN "order_id",
ADD COLUMN     "active" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "order" (
    "id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);
