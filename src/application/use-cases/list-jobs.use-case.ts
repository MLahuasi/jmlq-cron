import { CronError, SchedulerError } from "../../domain/errors";
import { ISchedulerPort } from "../../domain/ports";
import { CRON_ERROR_CODES } from "../../domain/types";
/**
 * ReturnType<ISchedulerPort["list"]> garantiza que:
 * - Si mañana cambias scheduler.list() a async, o cambias el tipo de retorno, el caso de uso se mantiene sincronizado sin tocarlo
 */
export type ListJobsUseCase = () => ReturnType<ISchedulerPort["list"]>;

// Caso de uso "listJobs": devuelve una función que, al ejecutarse, lista todos los jobs.
export function listJobsUseCase(scheduler: ISchedulerPort): ListJobsUseCase {
  // Retorna una función sin parámetros que delega en scheduler.list().
  // Llama al puerto para obtener los JobHandle activos.
  return () => {
    try {
      return scheduler.list();
    } catch (e) {
      // Si ya es un error del dominio, lo propagamos
      if (e instanceof CronError) {
        throw e;
      }

      // Lo envolvemos como error de infraestructura
      throw new SchedulerError({
        code: CRON_ERROR_CODES.INFRASTRUCTURE_ERROR,
        message: "Unexpected error while listing jobs.",
        cause: e,
      });
    }
  };
}
