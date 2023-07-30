import { Request, Response } from "express";
import jwt_decode from "jwt-decode";

import { ValueUserProps } from "../buy/CreateBuyController";
import { CreateOrderPadService } from "../../service/ordersPad/CreateOrdersPadService";

class CreateOrdersPadController {
  async handle(req: Request, res: Response) {
    const data = req.body;
    const token = req.headers.authorization.slice(7);

    let idUser = "";

    if (token) {
      const dataUser = jwt_decode(token) as any;
      const valueUser = dataUser as ValueUserProps;
      idUser = valueUser.sub;
    }

    const createOrderPadService = new CreateOrderPadService();

    const ordersPad = await createOrderPadService.execute({
      ...data,
      idUser,
    });

    return res.json(ordersPad);
  }
}

export { CreateOrdersPadController };
