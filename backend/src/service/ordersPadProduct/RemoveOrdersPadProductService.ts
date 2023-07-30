import prismaClient from "../../prisma";

class RemoveOrdersPadProductService {
  async execute(product_id: string) {
    const orderPadProduct = await prismaClient.orderPadProduct.delete({
      where: { id: product_id },
    });

    return orderPadProduct;
  }
}

export { RemoveOrdersPadProductService };
