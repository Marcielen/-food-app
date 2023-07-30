/*
  Warnings:

  - You are about to drop the column `items_selected` on the `items` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_product_id_fkey";

-- AlterTable
ALTER TABLE "items" DROP COLUMN "items_selected";

-- CreateTable
CREATE TABLE "_ItemToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ItemToProduct_AB_unique" ON "_ItemToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemToProduct_B_index" ON "_ItemToProduct"("B");

-- AddForeignKey
ALTER TABLE "_ItemToProduct" ADD CONSTRAINT "_ItemToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToProduct" ADD CONSTRAINT "_ItemToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
