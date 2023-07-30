/*
  Warnings:

  - You are about to drop the column `amount` on the `Buy` table. All the data in the column will be lost.
  - You are about to drop the column `item` on the `Buy` table. All the data in the column will be lost.
  - Added the required column `order_pad_id` to the `Buy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Buy" DROP COLUMN "amount",
DROP COLUMN "item",
ADD COLUMN     "order_pad_id" TEXT NOT NULL;
