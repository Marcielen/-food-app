-- CreateTable
CREATE TABLE "pay" (
    "id" TEXT NOT NULL,
    "order_pad_id" TEXT NOT NULL,
    "idUser" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pay_pkey" PRIMARY KEY ("id")
);
