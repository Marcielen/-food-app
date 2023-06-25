import prismaClient from "../../prisma";

interface ProductRequest {
  name: string;
  price: string;
  description: string;
  banner: string;
  category_id: string;
}

class CreateProductService {
  async execute({
    name,
    price,
    description,
    banner,
    category_id,
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

    const produtc = await prismaClient.product.create({
      data: {
        name,
        price,
        banner,
        category_id,
        description,
      },
    });

    return produtc;
  }
}

export { CreateProductService };
