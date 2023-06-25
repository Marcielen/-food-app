import prismaClient from "../../prisma";

class FinishOrderService {
  async execute(order_id: string) {
    const order = await prismaClient.order.update({
      where: {
        id: order_id,
      },
      data: {
        status: true,
      },
    });

    return order;
  }
}

export { FinishOrderService };
