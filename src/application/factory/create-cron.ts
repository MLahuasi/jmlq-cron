import type { ISchedulerPort } from "../../domain";
import { CronFacade } from "../facade/cron.facade";

export function createCron(scheduler: ISchedulerPort): CronFacade {
  return new CronFacade(scheduler);
}
