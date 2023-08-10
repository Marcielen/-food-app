import prismaClient from "../../prisma";

type ProductProps = {
  id: string;
  product_id: string;
  product_name: string;
  idUser: string;
  amount: number;
  created_at: Date;
  updated_at: Date;
};

class ListProductSoldService {
  async execute(idUser: string) {
    const productSold = await prismaClient.productSold.findMany({
      where: {
        idUser,
      },
    });

    const groupedItems = productSold.reduce((acc, curr) => {
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

    return groupedItems;
  }
}

export { ListProductSoldService };
