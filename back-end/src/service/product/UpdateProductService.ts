import prismaClient from "../../prisma";

export interface ProductRequest {
  name: string;
  price: string;
  description: string;
  banner: string;
  category_id: string;
  idUser: string;
  id: string;
}

class UpdateProductService {
  async execute({
    name,
    price,
    description,
    banner,
    category_id,
    id,
    idUser,
  }: ProductRequest) {
    if (name === "") {
      throw new Error("Name invalid");
    }

    if (price === "") {
      throw new Error("Price invalid");
    }

    if (category_id === "") {
      throw new Error("Category invalid");
    }

    const produtc = await prismaClient.product.update({
      where: { id },
      data: {
        name,
        price,
        banner: banner || "",
        category_id,
        description: description || "",
        idUser,
      },
    });

    return produtc;
  }
}

export { UpdateProductService };
