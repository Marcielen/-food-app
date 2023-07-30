import prismaClient from "../../prisma";

class ListPayService {
  async execute(idUser: string) {
    const pay = await prismaClient.pay.findMany({
      where: {
        idUser,
      },
    });

    return pay;
  }
}

export { ListPayService };
