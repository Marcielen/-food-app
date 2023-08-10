import { Request, Response } from "express";
import jwt_decode from "jwt-decode";

import { CreateProductSoldService } from "../../service/ProductSold/CreateProductSoldService";

export type ValueUserProps = {
  sub: string;
};

class CreateProductSoldController {
  async handle(req: Request, res: Response) {
    const token = req.headers.authorization.slice(7);

    let idUser = "";

    if (token) {
      const dataUser = jwt_decode(token) as any;
      const valueUser = dataUser as ValueUserProps;
      idUser = valueUser.sub;
    }

    const data = req.body;

    const createProductSoldService = new CreateProductSoldService();

    const createProductSold = await Promise.all(
      data.listProductId.map((dataItem) =>
        createProductSoldService.execute({
          ...dataItem,
          idUser,
        })
      )
    );

    return res.json(createProductSold);
  }
}

export { CreateProductSoldController };
