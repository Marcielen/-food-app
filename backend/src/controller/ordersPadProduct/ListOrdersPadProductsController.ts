import { Request, Response } from "express";
import jwt_decode from "jwt-decode";

import { ValueUserProps } from "../buy/CreateBuyController";
import { ListOrdersPadProductService } from "../../service/ordersPadProduct/ListOrdersPadProductService";

class ListOrdersPadProductontroller {
  async handle(req: Request, res: Response) {
    const { order_pad_id } = req.query;

    const token = req.headers.authorization.slice(7);

    let idUser = "";

    if (token) {
      const dataUser = jwt_decode(token) as any;
      const valueUser = dataUser as ValueUserProps;
      idUser = valueUser.sub;
    }

    const listOrdersPadProductService = new ListOrdersPadProductService();

    const ordersPadProduct = await listOrdersPadProductService.execute({
      idUser,
      order_pad_id,
    } as any);

    return res.json(ordersPadProduct);
  }
}

export { ListOrdersPadProductontroller };
