import { Request, Response } from "express";
import jwt_decode from "jwt-decode";

import { ListProductSoldService } from "../../service/ProductSold/ListProductSoldService";

export type ValueUserProps = {
  sub: string;
};

class ListProductSoldController {
  async handle(req: Request, res: Response) {
    const token = req.headers.authorization.slice(7);

    let idUser = "";

    if (token) {
      const dataUser = jwt_decode(token) as any;
      const valueUser = dataUser as ValueUserProps;
      idUser = valueUser.sub;
    }

    const listProductSoldService = new ListProductSoldService();

    const listProductSold = await listProductSoldService.execute(idUser);

    return res.json(listProductSold);
  }
}

export { ListProductSoldController };
