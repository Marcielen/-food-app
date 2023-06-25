import prismaClient from "../../prisma";

class ListByCategoryService {
  async execute(category_id: string) {
    const findByCategory = await prismaClient.product.findMany({
      where: {
        category_id,
      },
    });

    return findByCategory;
  }
}

export { ListByCategoryService };
