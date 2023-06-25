import prismaClient from "../../prisma";

class RemoveItemService {
  async execute(item_id: string) {
    if (item_id === "") {
      throw new Error("order invalid");
    }

    const order = await prismaClient.item.delete({
      where: { id: item_id },
    });

    return order;
  }
}

export { RemoveItemService };
