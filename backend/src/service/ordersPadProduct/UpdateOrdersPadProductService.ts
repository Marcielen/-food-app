import prismaClient from "../../prisma";

type OrdersPadProductServiceProps = {
  idUser: string;
  product_id: string;
  amount?: number;
  wasSold?: boolean;
};

class UpdateOrdersPadProductService {
  async execute({ product_id, amount, wasSold }: OrdersPadProductServiceProps) {
    const orderPadProduct = await prismaClient.orderPadProduct.update({
      where: { id: product_id },
      data: { amount, wasSold },
    });

    return orderPadProduct;
  }
}

export { UpdateOrdersPadProductService };
