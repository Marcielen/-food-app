/*
  Warnings:

  - Added the required column `order_id` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderProduct" DROP CONSTRAINT "OrderProduct_item_id_fkey";

-- AlterTable
ALTER TABLE "items" ADD COLUMN     "order_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "OrderProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
