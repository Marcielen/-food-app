import prismaClient from "../../prisma";

export type ListItemsServiceProps = {
  idUser: string;
  search: string;
  paginate?: boolean;
  currentPage?: number;
  pageSize?: number;
};

class ListItemsService {
  async execute({
    idUser,
    search,
    paginate = false,
    currentPage = 1,
    pageSize = 10,
  }: ListItemsServiceProps) {
    const skip = (currentPage - 1) * pageSize;

    const orderRegistrations = await prismaClient.orderRegistration.findMany({
      where: {
        idUser,
        order: {
          contains: search,
        },
      },
      orderBy: {
        created_at: "asc",
      },
      skip: paginate ? skip : undefined,
      take: paginate ? parseInt(String(pageSize)) : undefined,
    });

    const totalCount = await prismaClient.orderRegistration.count({
      where: {
        idUser,
        order: {
          contains: search,
        },
      },
    });

    return paginate
      ? { registry: orderRegistrations, totalCount }
      : orderRegistrations;
  }
}

export { ListItemsService };
