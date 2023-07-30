import { Request, Response } from "express";
import jwt_decode from "jwt-decode";

import { ListCategoryService } from "../../service/category/ListCategoryService";
import { ValueUserProps } from "../buy/CreateBuyController";

class ListCategoryController {
  async handle(req: Request, res: Response) {
    const token = req.headers.authorization.slice(7);

    let idUser = "";

    if (token) {
      const dataUser = jwt_decode(token) as any;
      const valueUser = dataUser as ValueUserProps;
      idUser = valueUser.sub;
    }
    const listCategoryService = new ListCategoryService();

    const category = await listCategoryService.execute(idUser);

    return res.json(category);
  }
}

export { ListCategoryController };
