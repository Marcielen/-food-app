import { Request, Response } from "express";

import { DetailOrderService } from "../../services/order/DetailOrderService";

class DetailOrderController {
  async handle(req: Request, res: Response) {
    const { order_id } = req.body;

    const detailOrderService = new DetailOrderService();

    const order = await detailOrderService.execute(order_id);

    return res.json(order);
  }
}

export { DetailOrderController };
