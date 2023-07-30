import { Request, Response } from "express";
import jwt_decode from "jwt-decode";

import {
  ListItemsService,
  ListItemsServiceProps,
} from "../../service/ordersRegister/ListItemsService";
import { ValueUserProps } from "../buy/CreateBuyController";

class ListItemsController {
  async handle(req: Request, res: Response) {
    const token = req.headers.authorization.slice(7);
    const { search, currentPage, paginate, pageSize } = req.query as any;

    let idUser = "";

    if (token) {
      const dataUser = jwt_decode(token) as any;
      const valueUser = dataUser as ValueUserProps;
      idUser = valueUser.sub;
    }

    const listItemsService = new ListItemsService();

    const item = await listItemsService.execute({
      idUser,
      search,
      currentPage,
      paginate,
      pageSize,
    } as ListItemsServiceProps);

    return res.json(item);
  }
}

export { ListItemsController };
