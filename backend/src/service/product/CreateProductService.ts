import prismaClient from "../../prisma";

export interface ProductRequest {
  name: string;
  price: string;
  description: string;
  banner: string;
  category_id: string;
  idUser: string;
}

class CreateProductService {
  async execute({
    name,
    price,
    description,
    banner,
    category_id,
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

    const productNameExist = await prismaClient.product.findFirst({
      where: { name, idUser },
    });

    if (productNameExist) {
      throw new Error("Product name already exist");
    }

    const produtc = await prismaClient.product.create({
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

export { CreateProductService };
