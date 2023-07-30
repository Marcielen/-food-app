import { Request, Response } from "express";

import { RemoveOrdersPadProductService } from "../../service/ordersPadProduct/RemoveOrdersPadProductService";

class RemoveOrdersPadProductController {
  async handle(req: Request, res: Response) {
    const { product_id } = req.query;

    const removeOrdersPadProductService = new RemoveOrdersPadProductService();

    const ordersPadProduct = await removeOrdersPadProductService.execute(
      product_id as string
    );

    return res.json(ordersPadProduct);
  }
}

export { RemoveOrdersPadProductController };
