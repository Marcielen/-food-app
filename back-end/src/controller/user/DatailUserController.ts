import { Response, Request } from "express";

import { DatailUserService } from "../../service/user/DatailUserService";

class DetailUserController {
  async handle(req: Request, res: Response) {
    const createUserService = new DatailUserService();

    const { user_id } = req;

    const user = await createUserService.execute(user_id);

    return res.json(user);
  }
}

export { DetailUserController };
