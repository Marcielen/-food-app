import { Response } from "express";

import { HealthService } from "../../service/health/HealthService";

export class HealthController {
  async handle(_, res: Response) {
    const healthService = new HealthService();

    const health = await healthService.execute();

    return res.json(health);
  }
}
