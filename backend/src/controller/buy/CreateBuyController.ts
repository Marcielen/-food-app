import { Request, Response } from "express";
import jwt_decode from "jwt-decode";

import { CreateBuyService } from "../../service/buy/CreateBuyService";

export type ValueUserProps = {
  sub: string;
};

class CreateBuyController {
  async handle(req: Request, res: Response) {
    const token = req.headers.authorization.slice(7);

    let idUser = "";

    if (token) {
      const dataUser = jwt_decode(token) as any;
      const valueUser = dataUser as ValueUserProps;
      idUser = valueUser.sub;
    }

    const data = req.body;
    const createBuyService = new CreateBuyService();

    const buy = await createBuyService.execute({
      ...data,
      idUser,
    });

    return res.json(buy);
  }
}

export { CreateBuyController };
