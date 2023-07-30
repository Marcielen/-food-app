import { hash } from "bcryptjs";

import prismaClient from "../../prisma";

interface CreateUserServiceProps {
  email: string;
  password: string;
  name: string;
}

class CreateUserService {
  async execute({ email, password, name }: CreateUserServiceProps) {
    const emailExist = await prismaClient.user.findFirst({
      where: { email: email },
    });

    if (emailExist) {
      throw new Error("Email exist");
    }
    const passwordHash = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    return user;
  }
}

export { CreateUserService };
