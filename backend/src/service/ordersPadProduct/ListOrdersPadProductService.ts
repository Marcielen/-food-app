import prismaClient from "../../prisma"; // Importe o PrismaClient corretamente

type ListOrdersPadProductProps = {
  id: string;
  order_pad_id: string;
  product_id: string;
  amount: number;
  totalPrice: string;
  idUser: string;
  banner: string;
  name: string;
  created_at: Date;
  updated_at: Date;
};

class ListOrdersPadProductService {
  async execute(order_pad_id: string) {
    const orderPadProduct = await prismaClient.orderPadProduct.findMany({
      where: { order_pad_id },
      orderBy: {
        created_at: "asc",
      },
    });

    const newData = orderPadProduct.reduce(
      (
        accumulator: ListOrdersPadProductProps[],
        item: ListOrdersPadProductProps
      ) => {
        const existingItem = accumulator.find(
          (accItem) => accItem.product_id === item.product_id
        );

        if (existingItem) {
          existingItem.amount += item.amount;
        } else {
          accumulator.push({ ...item });
        }

        return accumulator;
      },
      []
    );

    return newData;
  }
}

export { ListOrdersPadProductService };
