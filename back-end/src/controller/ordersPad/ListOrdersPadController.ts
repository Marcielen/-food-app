import { Request, Response } from "express";
import jwt_decode from "jwt-decode";

import { ValueUserProps } from "../buy/CreateBuyController";
import {
  ListOrdersPadService,
  ListOrdersPadServiceProps,
} from "../../service/ordersPad/ListOrdersPadService";

class ListOrdersPadController {
  async handle(req: Request, res: Response) {
    const token = req.headers.authorization.slice(7);
    const { search, currentPage, paginate, pageSize } = req.query as any;

    let idUser = "";

    if (token) {
      const dataUser = jwt_decode(token) as any;
      const valueUser = dataUser as ValueUserProps;
      idUser = valueUser.sub;
    }

    const listOrdersPadService = new ListOrdersPadService();

    const ordersPad = await listOrdersPadService.execute({
      idUser,
      search,
      currentPage,
      paginate,
      pageSize,
    } as ListOrdersPadServiceProps);

    return res.json(ordersPad);
  }
}

export { ListOrdersPadController };
