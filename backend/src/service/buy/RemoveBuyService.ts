import prismaClient from "../../prisma";

class RemoveBuyService {
  async execute(id: string) {
    if (id === "") {
      throw new Error("buy invalid");
    }

    const buy = await prismaClient.buy.delete({
      where: { id },
    });

    return buy;
  }
}

export { RemoveBuyService };
