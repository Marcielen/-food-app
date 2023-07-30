import { Request, Response } from "express";
import { RemoveProductService } from "../../service/product/RemoveProductService";

class RemoveProductController {
  async handle(req: Request, res: Response) {
    const { product_id } = req.query;

    const removeProductService = new RemoveProductService();

    const product = await removeProductService.execute(product_id as string);

    return res.json(product);
  }
}

export { RemoveProductController };
