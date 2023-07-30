import { Request, Response } from "express";
import jwt_decode from "jwt-decode";

import { ValueUserProps } from "../buy/CreateBuyController";
import { ListOrdersPadProductService } from "../../service/ordersPadProduct/ListOrdersPadProductService";

class ListOrdersPadProductontroller {
  async handle(req: Request, res: Response) {
    const { order_pad_id } = req.query;

    const listOrdersPadProductService = new ListOrdersPadProductService();

    const ordersPadProduct = await listOrdersPadProductService.execute(
      order_pad_id as string
    );

    return res.json(ordersPadProduct);
  }
}

export { ListOrdersPadProductontroller };
