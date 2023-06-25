import { Response, Request } from "express";

import { DetailUserService } from "../../services/user/DetailUserService";

class DetailUserController {
  async handle(req: Request, res: Response) {
    const createUserService = new DetailUserService();

    const { user_id } = req;

    const user = await createUserService.execute(user_id);

    return res.json(user);
  }
}

export { DetailUserController };
