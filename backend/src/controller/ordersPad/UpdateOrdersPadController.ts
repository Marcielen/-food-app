import { Request, Response } from "express";

import { UpdateOrdersPadService } from "../../service/ordersPad/UpdateOrdersPadService";

class UpdateOrdersPadController {
  async handle(req: Request, res: Response) {
    const data = req.body;
    const updateOrdersPadService = new UpdateOrdersPadService();

    const product = await updateOrdersPadService.execute({
      ...data,
    });

    return res.json(product);
  }
}

export { UpdateOrdersPadController };
