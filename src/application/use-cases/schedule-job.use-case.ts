import { CronError, SchedulerError } from "../../domain/errors";
import { ICronOptions, ISchedulerPort } from "../../domain/ports";
import { CRON_ERROR_CODES, JobHandler } from "../../domain/types";
import { CronExpressionVO } from "../../domain/value-objects";

export type ScheduleJobUseCase = (
  cronExpr: string,
  task: JobHandler,
  options?: ICronOptions
) => ReturnType<ISchedulerPort["schedule"]>;

// Caso de uso "scheduleJob": compone validación + delegación al puerto de scheduler.
export function scheduleJobUseCase(
  scheduler: ISchedulerPort
): ScheduleJobUseCase {
  return (cronExpr: string, task: JobHandler, options?: ICronOptions) => {
    try {
      // 1) VO: si la expresión es inválida, lanzará InvalidCronExpressionError (CronError)
      const expr = CronExpressionVO.create(cronExpr);

      // 2) Delegación: pasa la expresión validada al adaptador que implementa ISchedulerPort.
      return scheduler.schedule(expr.value, task, options);
    } catch (e) {
      // Si ya es un error del dominio cron, lo propagamos sin tocarlo
      if (e instanceof CronError) {
        throw e;
      }

      // Cualquier otro error (infraestructura, librería externa, etc.) se envuelve
      throw new SchedulerError({
        code: CRON_ERROR_CODES.INFRASTRUCTURE_ERROR,
        message: `Unexpected error while scheduling the job with the cron expression - "${cronExpr}".`,
        cause: e,
      });
    }
  };
}
