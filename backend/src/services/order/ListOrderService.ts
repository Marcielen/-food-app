import prismaClient from "../../prisma";

class ListOrderService {
  async execute() {
    const category = await prismaClient.order.findMany({
      where: {
        draft: false,
        status: false,
      },

      orderBy: {
        created_at: "desc",
      },
    });

    return category;
  }
}

export { ListOrderService };
