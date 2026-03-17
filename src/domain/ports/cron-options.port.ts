import { IMutex } from ".";

/**
 * ICronOptions:
 * Configuración opcional por job.
 * Permite sobreescribir defaults a nivel de dominio.
 */
export interface ICronOptions {
  /** Identificador legible del job. */
  readonly name?: string;

  /** Ejecutar inmediatamente al registrar. */
  readonly runOnInit?: boolean;

  /** Zona horaria IANA (ej: America/Guayaquil). */
  readonly timezone?: string;

  /** Evita solapes entre ejecuciones del mismo job. */
  readonly singleton?: boolean;

  /** Implementación de locking distribuido. */
  readonly mutex?: IMutex;
}
