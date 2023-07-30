import prismaClient from "../../prisma";

type OrdersPadProductServiceProps = {
  idUser: string;
  product_id: string;
  amount: number;
};

class UpdateOrdersPadProductService {
  async execute({ product_id, amount }: OrdersPadProductServiceProps) {
    const orderPadProduct = await prismaClient.orderPadProduct.update({
      where: { id: product_id },
      data: { amount },
    });

    return orderPadProduct;
  }
}

export { UpdateOrdersPadProductService };
