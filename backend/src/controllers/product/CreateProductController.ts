import { Request, Response } from "express";

import { CreateProductService } from "../../services/product/CreateProductService";

class CreateProductController {
  async handle(req: Request, res: Response) {
    const data = req.body;
    const createProductService = new CreateProductService();

    if (!req.file) {
      throw new Error("Error upload file");
    } else {
      const { filename: banner } = req.file;

      const product = await createProductService.execute({
        ...data,
        banner,
      });

      return res.json(product);
    }
  }
}

export { CreateProductController };
