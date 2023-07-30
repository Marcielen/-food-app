import { Request, Response } from "express";
import { RemoveProductService } from "../../service/product/RemoveProductService";
import { RemoveItemsService } from "../../service/ordersRegister/RemoveItemsService";

class RemoveItemsController {
  async handle(req: Request, res: Response) {
    const { item_id } = req.query;

    const removeItemsService = new RemoveItemsService();

    const item = await removeItemsService.execute(item_id as string);

    return res.json(item);
  }
}

export { RemoveItemsController };
