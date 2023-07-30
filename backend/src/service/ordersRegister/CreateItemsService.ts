import prismaClient from "../../prisma";

export interface itemRequest {
  order: string;
  amount: number;
  product_id: string;
  idUser: string;
  active: boolean;
}

class CreateItemsService {
  async execute({ order, active, idUser }: itemRequest) {
    const orderExist = await prismaClient.orderRegistration.findFirst({
      where: { order, idUser },
    });

    if (orderExist) {
      throw new Error("Order already exist");
    }

    const orderRegistration = await prismaClient.orderRegistration.create({
      data: {
        order,
        active,
        idUser,
      },
    });

    return orderRegistration;
  }
}

export { CreateItemsService };
