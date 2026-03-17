import { ICronOptions, IJobHandle } from ".";
import { JobHandler } from "../types";

/**
 * ISchedulerPort:
 * Puerto principal que todas las implementaciones de scheduling deben cumplir.
 * Infraestructura (ej: node-cron) implementará esta interfaz.
 */
export interface ISchedulerPort {
  /**
   * Registra un job en el scheduler.
   * @param cronTime  Expresión cron válida para la implementación.
   * @param task      Función a ejecutar.
   * @param options   Opciones por-job.
   */
  schedule(
    cronTime: string,
    task: JobHandler,
    options?: ICronOptions
  ): IJobHandle;

  /** Lista todos los jobs registrados. */
  list(): IJobHandle[];

  /** Busca un job por nombre. */
  findByName(name: string): IJobHandle | undefined;

  /** Cancela y elimina un job por nombre. */
  cancel(name: string): void;
}
