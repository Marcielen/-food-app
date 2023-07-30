import { Request, Response } from "express";
import jwt_decode from "jwt-decode";

import { ValueUserProps } from "../buy/CreateBuyController";
import { CreateOrdersPadProductService } from "../../service/ordersPadProduct/CreatOrdersPadProductService";

class CreateOrderPadProductController {
  async handle(req: Request, res: Response) {
    const data = req.body;
    const token = req.headers.authorization.slice(7);

    let idUser = "";

    if (token) {
      const dataUser = jwt_decode(token) as any;
      const valueUser = dataUser as ValueUserProps;
      idUser = valueUser.sub;
    }

    const createOrdersPadProductService = new CreateOrdersPadProductService();

    const createdOrders = await Promise.all(
      data.map((dataItem) =>
        createOrdersPadProductService.execute({
          ...dataItem,
          idUser,
        })
      )
    );

    return res.json(createdOrders);
  }
}

export { CreateOrderPadProductController };
