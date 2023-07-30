import { Request, Response } from "express";
import jwt_decode from "jwt-decode";

import { ListBuyService } from "../../service/buy/ListBuyService";
import { ValueUserProps } from "./CreateBuyController";

export class ListBuyController {
  async handle(req: Request, res: Response) {
    const token = req.headers.authorization.slice(7);

    let idUser = "";

    if (token) {
      const dataUser = jwt_decode(token) as any;
      const valueUser = dataUser as ValueUserProps;

      idUser = valueUser.sub;
    }

    const listBuyService = new ListBuyService();

    const buy = await listBuyService.execute(idUser);

    return res.json(buy);
  }
}
