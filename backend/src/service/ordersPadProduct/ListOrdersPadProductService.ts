import prismaClient from "../../prisma"; // Importe o PrismaClient corretamente

type ListOrdersPadProductProps = {
  order_pad_id: string;
  idUser: string;
};

type ProductProps = {
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
  async execute({ order_pad_id, idUser }: ListOrdersPadProductProps) {
    const orderPadProduct = await prismaClient.orderPadProduct.findMany({
      where: { order_pad_id, idUser },
      orderBy: {
        created_at: "asc",
      },
    });

    const groupedItems = orderPadProduct.reduce((acc, curr) => {
      const itemAlreadyAddedIndex = acc.findIndex(
        (item) => item.product_id === curr.product_id
      );

      if (itemAlreadyAddedIndex > -1) {
        acc.splice(itemAlreadyAddedIndex, 1, {
          ...acc[itemAlreadyAddedIndex],
          amount: acc[itemAlreadyAddedIndex].amount + curr.amount,
        });
      } else {
        acc.push({
          ...curr,
          amount: curr.amount,
        });
      }

      return acc;
    }, [] as ProductProps[]);

    console.log(groupedItems, orderPadProduct);

    return groupedItems;
  }
}

export { ListOrdersPadProductService };
