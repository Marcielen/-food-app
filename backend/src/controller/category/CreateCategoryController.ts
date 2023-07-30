import { Request, Response } from "express";
import jwt_decode from "jwt-decode";

import { CreateCategoryService } from "../../service/category/CreateCategoryService";
import { ValueUserProps } from "../buy/CreateBuyController";

class CreateCategoryController {
  async handle(req: Request, res: Response) {
    const data = req.body;
    const token = req.headers.authorization.slice(7);

    let idUser = "";

    if (token) {
      const dataUser = jwt_decode(token) as any;
      const valueUser = dataUser as ValueUserProps;
      idUser = valueUser.sub;
    }
    const createCategoryService = new CreateCategoryService();

    const category = await createCategoryService.execute({
      name: data.name,
      idUser,
    });

    return res.json(category);
  }
}

export { CreateCategoryController };
