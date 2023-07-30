import { Request, Response } from "express";
import jwt_decode from "jwt-decode";

import { CreateProductService } from "../../service/product/CreateProductService";
import { ValueUserProps } from "../buy/CreateBuyController";

class CreateProductController {
  async handle(req: Request, res: Response) {
    const data = req.body;
    const token = req.headers.authorization.slice(7);

    let idUser = "";

    if (token) {
      const dataUser = jwt_decode(token) as any;
      const valueUser = dataUser as ValueUserProps;
      idUser = valueUser.sub;
    }

    const createProductService = new CreateProductService();

    if (!req.file) {
      const product = await createProductService.execute({
        ...data,
        banner: "",
        idUser,
      });

      return res.json(product);
    } else {
      const { filename: banner } = req.file;

      const product = await createProductService.execute({
        ...data,
        banner,
        idUser,
      });

      return res.json(product);
    }
  }
}

export { CreateProductController };
