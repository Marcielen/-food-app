import prismaClient from "../../prisma";

class DetailUserService {
  async execute(user_id: string) {
    const userData = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    return userData;
  }
}

export { DetailUserService };
