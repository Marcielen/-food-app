import prismaClient from "../../prisma";

class RemoveItemsService {
  async execute(item_id: string) {
    if (item_id === "") {
      throw new Error("order invalid");
    }

    const orderRegistration = await prismaClient.orderRegistration.delete({
      where: { id: item_id },
    });

    return orderRegistration;
  }
}

export { RemoveItemsService };
