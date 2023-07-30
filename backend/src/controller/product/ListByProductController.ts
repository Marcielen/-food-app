import { Request, Response } from "express";
import jwt_decode from "jwt-decode";

import {
  ListProductService,
  ListProductServiceProps,
} from "../../service/product/ListProductService";
import { ValueUserProps } from "../buy/CreateBuyController";

class ListByProductController {
  async handle(req: Request, res: Response) {
    const token = req.headers.authorization.slice(7);
    const { search, currentPage, paginate, pageSize } = req.query as any;

    let idUser = "";

    if (token) {
      const dataUser = jwt_decode(token) as any;
      const valueUser = dataUser as ValueUserProps;
      idUser = valueUser.sub;
    }
    const listProductService = new ListProductService();

    const product = await listProductService.execute({
      idUser,
      search,
      currentPage,
      paginate,
      pageSize,
    } as ListProductServiceProps);

    return res.json(product);
  }
}

export { ListByProductController };
