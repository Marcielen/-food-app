/*
  Warnings:

  - You are about to drop the column `item_id` on the `OrderProduct` table. All the data in the column will be lost.
  - You are about to drop the column `item_id` on the `order` table. All the data in the column will be lost.
  - Added the required column `order_pad_id` to the `OrderProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderProduct" DROP COLUMN "item_id",
ADD COLUMN     "order_pad_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "order" DROP COLUMN "item_id",
ADD COLUMN     "order_id" TEXT NOT NULL;
