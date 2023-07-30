import { Request, Response } from "express";

import { RemoveOrdersPadService } from "../../service/ordersPad/RemoveOrdersPadService";

class RemoveOrdersPadController {
  async handle(req: Request, res: Response) {
    const { order_id } = req.query;

    const removeOrdersPadService = new RemoveOrdersPadService();

    const ordersPad = await removeOrdersPadService.execute(order_id as string);

    return res.json(ordersPad);
  }
}

export { RemoveOrdersPadController };
