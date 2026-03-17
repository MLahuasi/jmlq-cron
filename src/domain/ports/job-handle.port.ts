/**
 * IJobHandle:
 * Representa un handle de control sobre un job registrado en el scheduler.
 */
export interface IJobHandle {
  /** Id interno del job dentro del scheduler. */
  readonly id: string;

  /** Nombre asignado por el cliente. */
  readonly name: string;

  /** Indica si el job está activo. */
  isRunning(): boolean;

  /** Reanuda el scheduling del job. */
  start(): void;

  /** Pausa el scheduling del job. */
  stop(): void;

  /** Detiene y elimina el job del registro. */
  cancel(): void;

  /** Próxima ejecución programada, si está disponible. */
  nextDateISO?(): string | null;
}
