import { Prisma } from "@prisma/client";

import prismaClient from "../../prisma";

type CreateBuyProps = {
  price: number;
  order_pad_id: string;
  idUser: string;
  name: string;
};

class CreateBuyService {
  async execute({ price, idUser, order_pad_id, name }: CreateBuyProps) {
    const orderPadIsExist = await prismaClient.buy.findMany({
      where: { order_pad_id, idUser },
    });

    if (orderPadIsExist.length > 0) {
      throw new Error("Order pad exist");
    }

    const itemService = await prismaClient.buy.create({
      data: {
        order_pad_id,
        name,
        price,
        idUser,
      },
    });

    return itemService;
  }
}

export { CreateBuyService };
