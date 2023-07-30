import { Request, Response } from "express";
import jwt_decode from "jwt-decode";

import { CreatePayService } from "../../service/pay/CreatePayService";

export type ValueUserProps = {
  sub: string;
};

class CreatePayController {
  async handle(req: Request, res: Response) {
    const token = req.headers.authorization.slice(7);

    let idUser = "";

    if (token) {
      const dataUser = jwt_decode(token) as any;
      const valueUser = dataUser as ValueUserProps;
      idUser = valueUser.sub;
    }

    const data = req.body;
    const createPayService = new CreatePayService();

    const pay = await createPayService.execute({
      ...data,
      idUser,
    });

    return res.json(pay);
  }
}

export { CreatePayController };
