import { Request, Response } from "express";

import { RemoveItemService } from "../../services/order/RemoveItemService";

class RemoveItemController {
  async handle(req: Request, res: Response) {
    const { item_id } = req.query;

    const removeItemService = new RemoveItemService();

    const order = await removeItemService.execute(item_id as string);

    return res.json(order);
  }
}

export { RemoveItemController };
