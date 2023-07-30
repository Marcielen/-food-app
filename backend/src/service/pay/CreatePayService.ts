import { Prisma } from "@prisma/client";

import prismaClient from "../../prisma";

type CreatePayProps = {
  order_pad_id: string;
  idUser: string;
  price: number;
};

class CreatePayService {
  async execute({ idUser, order_pad_id, price }: CreatePayProps) {
    const orderPadIsExist = await prismaClient.pay.findMany({
      where: { order_pad_id, idUser },
    });

    if (orderPadIsExist.length > 0) {
      throw new Error("Order pad already exist");
    }

    const payService = await prismaClient.pay.create({
      data: {
        order_pad_id,
        price,
        idUser,
      },
    });

    return payService;
  }
}

export { CreatePayService };
