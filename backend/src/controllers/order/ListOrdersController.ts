import { Request, Response } from "express";

import { ListOrderService } from "../../services/order/ListOrderService";

class ListOrderyController {
  async handle(req: Request, res: Response) {
    const listOrderService = new ListOrderService();

    const category = await listOrderService.execute();

    return res.json(category);
  }
}

export { ListOrderyController };
