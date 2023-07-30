import prismaClient from "../../prisma";

class DatailUserService {
  async execute(user_id) {
    const itemUser = await prismaClient.user.findFirst({
      where: { id: user_id },
      select: {
        email: true,
        name: true,
        id: true,
      },
    });

    return itemUser;
  }
}

export { DatailUserService };
