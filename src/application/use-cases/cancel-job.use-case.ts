import { ISchedulerPort, JobNotFoundError } from "../../domain";

export type CancelJobUseCase = (name: string) => boolean;

// Define el caso de uso "cancel" como una función de orden superior.
export function cancelJobUseCase(scheduler: ISchedulerPort): CancelJobUseCase {
  return (name: string): boolean => {
    const handle = scheduler.findByName(name);

    if (!handle) {
      // Error de dominio centralizado
      throw new JobNotFoundError(name);
    }

    scheduler.cancel(name);
    return true;
  };
}
