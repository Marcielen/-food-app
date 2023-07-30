import prismaClient from "../../prisma";

export type ListProductServiceProps = {
  idUser: string;
  search: string;
  paginate?: boolean;
  currentPage?: number;
  pageSize?: number;
};

class ListProductService {
  async execute({
    idUser,
    search,
    paginate = false,
    currentPage = 1,
    pageSize = 10,
  }: ListProductServiceProps) {
    const skip = (currentPage - 1) * pageSize;

    const product = await prismaClient.product.findMany({
      where: {
        idUser,
        name: {
          contains: search,
        },
      },
      orderBy: {
        created_at: "asc",
      },
      skip: paginate ? skip : undefined,
      take: paginate ? parseInt(String(pageSize)) : undefined,
    });

    const totalCount = await prismaClient.product.count({
      where: {
        idUser,
        name: {
          contains: search,
        },
      },
    });

    return paginate ? { registry: product, totalCount } : product;
  }
}

export { ListProductService };
