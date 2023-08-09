import prismaClient from "../../prisma";

type CreateOrdersPadProductServiceProps = {
  order_pad_id: string;
  idUser: string;
  product_id: string;
  amount: number;
  price: string;
  banner: string;
  name: string;
};

class CreateOrdersPadProductService {
  async execute({
    order_pad_id,
    idUser,
    product_id,
    amount,
    price,
    banner,
    name,
  }: CreateOrdersPadProductServiceProps) {
    const orderPadProduct = await prismaClient.orderPadProduct.create({
      data: {
        order_pad_id,
        idUser,
        product_id,
        amount,
        totalPrice: price,
        banner,
        name,
        wasSold: false,
      },
    });

    return orderPadProduct;
  }
}

export { CreateOrdersPadProductService };
