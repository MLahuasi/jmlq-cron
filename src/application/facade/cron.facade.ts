import {
  ICronOptions,
  ISchedulerPort,
  IJobHandle,
  JobHandler,
} from "../../domain";

import {
  listJobsUseCase,
  scheduleJobUseCase,
  cancelJobUseCase,
} from "../use-cases";

import type { HumanCron } from "../services/human-cron";
import { makeHumanCron } from "../services/human-cron";

/**
 * Facade de aplicación para el componente de cron.
 *
 * Expone:
 *   - create: API técnica basada en cron string.
 *   - human: API fluida y humana (every/daily/weekdays/on/monthly...).
 *   - list: lista los jobs activos.
 *   - cancel: cancela un job por nombre.
 */
export class CronFacade {
  private readonly scheduleJobFn: (
    cronExpr: string,
    task: JobHandler,
    options?: ICronOptions
  ) => IJobHandle;

  private readonly listJobsFn: () => IJobHandle[];
  private readonly cancelJobFn: (name: string) => boolean;

  private readonly humanApi: HumanCron;

  constructor(private readonly scheduler: ISchedulerPort) {
    this.scheduleJobFn = scheduleJobUseCase(this.scheduler);
    this.listJobsFn = listJobsUseCase(this.scheduler);
    this.cancelJobFn = cancelJobUseCase(this.scheduler);

    this.humanApi = makeHumanCron(this);
  }

  // ─────────────────────────────────────────────────────────
  // API técnica (cron string)
  // ─────────────────────────────────────────────────────────

  /**
   * Programa un job usando directamente una expresión cron.
   * Ej: "0 0 22 * * *" → todos los días a las 22:00.
   */
  create(
    cronExpr: string,
    task: JobHandler,
    options?: ICronOptions
  ): IJobHandle {
    return this.scheduleJobFn(cronExpr, task, options);
  }

  // ─────────────────────────────────────────────────────────
  // API humana (fluente)
  // ─────────────────────────────────────────────────────────

  get human(): HumanCron {
    return this.humanApi;
  }

  // ─────────────────────────────────────────────────────────
  // Otros casos de uso
  // ─────────────────────────────────────────────────────────

  list(): IJobHandle[] {
    return this.listJobsFn();
  }

  cancel(name: string): boolean {
    return this.cancelJobFn(name);
  }
}
