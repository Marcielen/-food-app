import prismaClient from "../../prisma";

type OrderRequestProps = {
  order_id: string;
  product_id: string;
  amount: number;
};

class AddItemService {
  async execute({ order_id, product_id, amount }: OrderRequestProps) {
    const order = await prismaClient.item.create({
      data: {
        order_id,
        product_id,
        amount,
      },
    });

    return order;
  }
}

export { AddItemService };
