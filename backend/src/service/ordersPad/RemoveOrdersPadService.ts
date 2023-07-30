import prismaClient from "../../prisma";

class RemoveOrdersPadService {
  async execute(order_id: string) {
    if (order_id === "") {
      throw new Error("order invalid");
    }

    const ordersPad = await prismaClient.orderPad.delete({
      where: { id: order_id },
    });

    return ordersPad;
  }
}

export { RemoveOrdersPadService };
