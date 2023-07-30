import { Request, Response } from "express";
import jwt_decode from "jwt-decode";

import { ValueUserProps } from "../buy/CreateBuyController";
import { UpdateProductService } from "../../service/product/UpdateProductService";

class UpdateProductController {
  async handle(req: Request, res: Response) {
    const data = req.body;
    const token = req.headers.authorization.slice(7);

    let idUser = "";

    if (token) {
      const dataUser = jwt_decode(token) as any;
      const valueUser = dataUser as ValueUserProps;
      idUser = valueUser.sub;
    }

    const updateProductService = new UpdateProductService();

    if (!req.file) {
      const product = await updateProductService.execute({
        ...data,
        banner: data?.file ? data?.file : "",
        idUser,
      });

      return res.json(product);
    } else {
      const { filename: banner } = req.file;

      const product = await updateProductService.execute({
        ...data,
        banner,
        idUser,
      });

      return res.json(product);
    }
  }
}

export { UpdateProductController };
