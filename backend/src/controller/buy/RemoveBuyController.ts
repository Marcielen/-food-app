import { Request, Response } from "express";
import jwt_decode from "jwt-decode";
import { RemoveBuyService } from "../../service/buy/RemoveBuyService";
import { ValueUserProps } from "./CreateBuyController";

class RemoveBuyController {
  async handle(req: Request, res: Response) {
    const { id } = req.query;
    const token = req.headers.authorization.slice(7);

    let idUser = "";

    if (token) {
      const dataUser = jwt_decode(token) as any;
      const valueUser = dataUser as ValueUserProps;
      idUser = valueUser.sub;
    }
    const removeBuyService = new RemoveBuyService();

    const buy = await removeBuyService.execute(id as string);

    return res.json(buy);
  }
}

export { RemoveBuyController };
