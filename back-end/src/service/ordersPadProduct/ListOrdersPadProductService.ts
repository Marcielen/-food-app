import prismaClient from "../../prisma"; // Importe o PrismaClient corretamente

class ListOrdersPadProductService {
  async execute(order_pad_id: string) {
    const orderPadProduct = await prismaClient.orderPadProduct.findMany({
      where: { order_pad_id },
      orderBy: {
        created_at: "asc",
      },
    });

    return orderPadProduct;
  }
}

export { ListOrdersPadProductService };
