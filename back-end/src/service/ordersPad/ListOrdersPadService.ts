import prismaClient from "../../prisma";

export type ListOrdersPadServiceProps = {
  idUser: string;
  search: string;
  paginate?: boolean;
  currentPage?: number;
  pageSize?: number;
};

class ListOrdersPadService {
  async execute({
    idUser,
    search,
    paginate = false,
    currentPage = 1,
    pageSize = 10,
  }: ListOrdersPadServiceProps) {
    const skip = (currentPage - 1) * pageSize;

    const ordersPad = await prismaClient.orderPad.findMany({
      where: {
        idUser,
        label: {
          contains: search,
        },
      },
      orderBy: {
        created_at: "asc",
      },
      skip: paginate ? skip : undefined,
      take: paginate ? Number(pageSize) : undefined, // Parse the pageSize as a number
    });

    const totalCount = await prismaClient.orderPad.count({
      where: {
        idUser,
        label: {
          contains: search,
        },
      },
    });

    return paginate ? { registry: ordersPad, totalCount } : ordersPad;
  }
}

export { ListOrdersPadService };
