import prismaClient from "../../prisma";

type OrderRequestProps = {
  table: number;
  name: string;
};

class CreateOrderyService {
  async execute({ name, table }: OrderRequestProps) {
    if (name === "") {
      throw new Error("Name invalid");
    }

    const order = await prismaClient.order.create({
      data: {
        name,
        table,
      },
    });

    return order;
  }
}

export { CreateOrderyService };
