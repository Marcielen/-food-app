import prismaClient from "../../prisma";

class RemoveCategoryService {
  async execute(id: string) {
    if (id === "") {
      throw new Error("category invalid");
    }

    const category = await prismaClient.category.delete({
      where: { id },
    });

    return category;
  }
}

export { RemoveCategoryService };
