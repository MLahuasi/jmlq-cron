import { ICronDefaults } from "../types";

export const DEFAULT_CRON_CONFIG: ICronDefaults = {
  /**
   * Define la zona horaria base que usará el scheduler para interpretar las expresiones cron.
   * Afecta cómo se calculan los próximos disparos del job.
   * Por ejemplo, "0 0 * * *" significa medianoche en esta zona horaria.
   * El usuario puede sobrescribir este valor.
   */
  TIMEZONE: "UTC",
  /**
   * Activa o desactiva el modo singleton, también conocido como “run only one at a time”.
   * Un job no se ejecuta si la instancia anterior sigue corriendo.
   * Evita:
   * - Solapamientos en jobs de larga duración.
   * - Sobrecarga del sistema por múltiples instancias simultáneas.
   * El usuario puede sobrescribir este valor.
   */
  SINGLETON: true,
  /**
   * Tiempo máximo (en milisegundos) que el sistema mantiene el mutex (candado) cuando SINGLETON está activo.
   * Este TTL (Time To Live):
   * - Evita que un lock se quede “atascado” si un job falla o muere inesperadamente
   * - Si el job tarda demasiado, el lock expira y permite una nueva ejecución.
   * - 60_000 ms = 1 minuto.
   * Cuándo modificarlo:
   * - Tareas largas → aumentar.
   * - Tareas muy rápidas → reducir.
   */
  MUTEX_TTL_MS: 60_000,
} as const;
