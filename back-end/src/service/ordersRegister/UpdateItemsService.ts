import prismaClient from "../../prisma";

interface itemRequest {
  order: string;
  amount: number;
  product_id: string;
  item_id: string;
  active: boolean;
}

class UpdateItemsService {
  async execute({ order, item_id, active }: itemRequest) {
    const orderRegistration = await prismaClient.orderRegistration.update({
      where: { id: item_id },
      data: { order, active },
    });

    return orderRegistration;
  }
}

export { UpdateItemsService };
