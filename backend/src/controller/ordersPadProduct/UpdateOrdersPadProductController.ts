import { Request, Response } from "express";

import { UpdateOrdersPadProductService } from "../../service/ordersPadProduct/UpdateOrdersPadProductService";

class UpdateOrdersPadProductController {
  async handle(req: Request, res: Response) {
    const data = req.body;
    const updateOrdersPadProductService = new UpdateOrdersPadProductService();

    const product = await updateOrdersPadProductService.execute({
      ...data,
    });

    return res.json(product);
  }
}

export { UpdateOrdersPadProductController };
