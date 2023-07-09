import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import prismaClient from "../../prisma";

interface AuthRequestProps {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthRequestProps) {
    const user = await prismaClient.user.findFirst({
      where: { email: email },
    });

    if (user === null) {
      throw new Error("Incorrect email or password");
    }

    const { name, email: emailUser, password: passwordUser, id } = user;

    if (!user) {
      throw new Error("Incorrect email or password");
    }

    const passwordMatch = await compare(password, passwordUser);

    if (!passwordMatch) {
      throw new Error("User/password incorrect");
    }

    const token = sign(
      {
        name,
        email: emailUser,
      },
      process.env.JWT_SECRET,
      {
        subject: id,
        expiresIn: "1d",
      }
    );

    return {
      id,
      name,
      emailUser,
      token,
    };
  }
}

export { AuthUserService };
