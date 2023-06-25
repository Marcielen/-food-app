import { Request, Response } from "express";

import { RemoveOrderService } from "../../services/order/RemoveOrderService";

class RemoveOrderController {
  async handle(req: Request, res: Response) {
    const { order_id } = req.query;
    const removeOrderController = new RemoveOrderService();

    const order = await removeOrderController.execute(order_id as string);

    return res.json(order);
  }
}

export { RemoveOrderController };
