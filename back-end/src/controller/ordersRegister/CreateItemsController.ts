import { Request, Response } from "express";
import jwt_decode from "jwt-decode";

import { CreateItemsService } from "../../service/ordersRegister/CreateItemsService";
import { ValueUserProps } from "../buy/CreateBuyController";

class CreateItemController {
  async handle(req: Request, res: Response) {
    const data = req.body;
    const token = req.headers.authorization.slice(7);

    let idUser = "";

    if (token) {
      const dataUser = jwt_decode(token) as any;
      const valueUser = dataUser as ValueUserProps;
      idUser = valueUser.sub;
    }
    const createItemsService = new CreateItemsService();

    const product = await createItemsService.execute({
      ...data,
      idUser,
    });

    return res.json(product);
  }
}

export { CreateItemController };
