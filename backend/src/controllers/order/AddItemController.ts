import { Request, Response } from "express";

import { AddItemService } from "../../services/order/AddItemService";

class AddItemController {
  async handle(req: Request, res: Response) {
    const data = req.body;
    const addItemService = new AddItemService();

    const order = await addItemService.execute(data);

    return res.json(order);
  }
}

export { AddItemController };
