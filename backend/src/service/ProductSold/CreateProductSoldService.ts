import prismaClient from "../../prisma";

type CreateProductSoldServiceProps = {
  product_id: string;
  idUser: string;
  product_name: string;
  amount: number;
};

class CreateProductSoldService {
  async execute({
    product_id,
    idUser,
    product_name,
    amount,
  }: CreateProductSoldServiceProps) {
    const productSold = await prismaClient.productSold.create({
      data: {
        product_id,
        idUser,
        product_name,
        amount,
      },
    });

    return productSold;
  }
}

export { CreateProductSoldService };
