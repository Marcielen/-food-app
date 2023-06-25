import prismaClient from "../../prisma";

class RemoveOrderService {
  async execute(order_id: string) {
    if (order_id === "") {
      throw new Error("order invalid");
    }

    const order = await prismaClient.order.delete({
      where: { id: order_id },
    });

    return order;
  }
}

export { RemoveOrderService };
