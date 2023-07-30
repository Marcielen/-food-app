import prismaClient from "../../prisma";

type UpdateOrdersPadServiceProps = {
  id: string;
  active: boolean;
};

class UpdateOrdersPadService {
  async execute({ id, active }: UpdateOrdersPadServiceProps) {
    const orderPadProduct = await prismaClient.orderPad.update({
      where: { id },
      data: { active }, // Update only the 'active' field
    });

    return orderPadProduct;
  }
}

export { UpdateOrdersPadService };
