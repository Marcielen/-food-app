import prismaClient from "../../prisma";

class RemoveProductService {
  async execute(product_id: string) {
    if (product_id === "") {
      throw new Error("product invalid");
    }

    const product = await prismaClient.product.delete({
      where: { id: product_id },
    });

    return product;
  }
}

export { RemoveProductService };
