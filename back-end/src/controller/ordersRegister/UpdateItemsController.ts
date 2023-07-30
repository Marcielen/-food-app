import { Request, Response } from "express";

import { UpdateItemsService } from "../../service/ordersRegister/UpdateItemsService";

class UpdateItemsController {
  async handle(req: Request, res: Response) {
    const data = req.body;
    const updateItemsService = new UpdateItemsService();

    const product = await updateItemsService.execute({
      ...data,
    });

    return res.json(product);
  }
}

export { UpdateItemsController };
