import prismaClient from "../../prisma";

type CreateOrderPadProps = {
  order_id: string;
  idUser: string;
  label: string;
  active?: boolean;
};

class CreateOrderPadService {
  async execute({
    order_id,
    idUser,
    label,
    active = true,
  }: CreateOrderPadProps) {
    const orderExist = await prismaClient.orderPad.findFirst({
      where: { order_id, idUser },
    });

    if (orderExist) {
      throw new Error("Order already exist");
    }

    const orderPad = await prismaClient.orderPad.create({
      data: {
        idUser,
        order_id,
        label,
        active,
      },
    });

    return orderPad.id;
  }
}

export { CreateOrderPadService };
