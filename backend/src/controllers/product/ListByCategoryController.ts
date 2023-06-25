import { Request, Response } from "express";

import { ListByCategoryService } from "../../services/product/ListByCategoryService";

class ListByCategoryController {
  async handle(req: Request, res: Response) {
    const { category_id } = req.query;
    const listByCategoryService = new ListByCategoryService();

    const listProduct = await listByCategoryService.execute(
      category_id as string
    );

    return res.json(listProduct);
  }
}

export { ListByCategoryController };
