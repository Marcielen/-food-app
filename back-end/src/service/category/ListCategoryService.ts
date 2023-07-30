import prismaClient from "../../prisma";

class ListCategoryService {
  async execute(idUser: string) {
    const product = await prismaClient.category.findMany({
      where: { idUser },
    });

    return product;
  }
}

export { ListCategoryService };
