import prismaClient from "../../prisma";

type CreateCategoryProps = {
  name: string;
  idUser: string;
};

class CreateCategoryService {
  async execute({ name, idUser }: CreateCategoryProps) {
    if (name === "") {
      throw new Error("Category invalid");
    }

    const category = await prismaClient.category.create({
      data: {
        name,
        idUser,
      },
    });

    return category;
  }
}

export { CreateCategoryService };
