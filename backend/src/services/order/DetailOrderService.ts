import prismaClient from "../../prisma";

class DetailOrderService {
  async execute(order_id: string) {
    const category = await prismaClient.item.findMany({
      where: {
        order_id,
      },
      include: {
        product: true,
        order: true,
      },
    });

    return category;
  }
}

export { DetailOrderService };
