import prismaClient from "../../prisma";

class ListBuyService {
  async execute(idUser: string) {
    const buy = await prismaClient.buy.findMany({
      where: {
        idUser,
      },
    });

    return buy;
  }
}

export { ListBuyService };
