import { Request, Response } from "express";
import { AuthUserService } from "../../service/user/AuthUserService";

class AuthUserController {
  async handle(req: Request, res: Response) {
    const valuesBody = req.body;
    const authUserService = new AuthUserService();

    const auth = await authUserService.execute(valuesBody);

    return res.json(auth);
  }
}

export { AuthUserController };
