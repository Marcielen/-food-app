/*
  Warnings:

  - You are about to drop the `items` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "items";

-- CreateTable
CREATE TABLE "orderRegistration" (
    "idUser" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "order" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orderRegistration_pkey" PRIMARY KEY ("id")
);
