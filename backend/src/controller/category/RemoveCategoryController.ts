import { Request, Response } from "express";

import { RemoveCategoryService } from "../../service/category/RemoveCategoryService";

class RemoveCategoryController {
  async handle(req: Request, res: Response) {
    const { id } = req.query;

    const removeCategoryService = new RemoveCategoryService();

    const category = await removeCategoryService.execute(id as string);

    return res.json(category);
  }
}

export { RemoveCategoryController };
