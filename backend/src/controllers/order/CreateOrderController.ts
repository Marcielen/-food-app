import { Request, Response } from "express";

import { CreateOrderyService } from "../../services/order/CreateOrderService";

class CreateOrderController {
  async handle(req: Request, res: Response) {
    const data = req.body;
    const createOrderyService = new CreateOrderyService();

    const order = await createOrderyService.execute(data);

    return res.json(order);
  }
}

export { CreateOrderController };
