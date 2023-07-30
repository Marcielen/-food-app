import { Request, Response } from "express";
import jwt_decode from "jwt-decode";

import { ListPayService } from "../../service/pay/ListPayService";
import { ValueUserProps } from "./CreatePayController";

export class ListPayController {
  async handle(req: Request, res: Response) {
    const token = req.headers.authorization.slice(7);

    let idUser = "";

    if (token) {
      const dataUser = jwt_decode(token) as any;
      const valueUser = dataUser as ValueUserProps;

      idUser = valueUser.sub;
    }

    const listPayService = new ListPayService();

    const pay = await listPayService.execute(idUser);

    return res.json(pay);
  }
}
