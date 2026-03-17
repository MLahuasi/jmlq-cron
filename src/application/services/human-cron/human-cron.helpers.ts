import { CronError } from "../../../domain/errors";
import { CRON_ERROR_CODES } from "../../../domain/types";
import type { DayName } from "../../../domain/value-objects";

/** Convierte nombre de día a índice cron (0=Domingo) */
export const DayToDOW: Record<DayName, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

export function parseHHmm(hhmm: string): { HH: number; MM: number } {
  if (typeof hhmm !== "string")
    throw new CronError({
      code: CRON_ERROR_CODES.INVALID_CRON_EXPRESSION,
      message: 'Invalid time: expected a string in "HH:mm" format.',
      cause: hhmm,
    });

  const m = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(hhmm.trim());
  if (!m)
    throw new CronError({
      code: CRON_ERROR_CODES.INVALID_CRON_EXPRESSION,
      message: 'Invalid time. Use 24h format "HH:mm", for example "03:00".',
      cause: hhmm,
    });

  return { HH: Number(m[1]), MM: Number(m[2]) };
}

// ─────────────────────────────────────────────────────────
// Constructores de expresiones cron legibles
// ─────────────────────────────────────────────────────────

export function cronEverySeconds(n: number): string {
  if (!Number.isInteger(n) || n <= 0)
    throw new CronError({
      code: CRON_ERROR_CODES.INVALID_CRON_EXPRESSION,
      message: "Seconds must be an integer > 0.",
      cause: n,
    });
  return `*/${n} * * * * *`;
}

export function cronEveryMinutes(n: number): string {
  if (!Number.isInteger(n) || n <= 0)
    throw new CronError({
      code: CRON_ERROR_CODES.INVALID_CRON_EXPRESSION,
      message: "Minutes must be an integer > 0.",
      cause: n,
    });
  return `0 */${n} * * * *`;
}

export function cronEveryHours(n: number): string {
  if (!Number.isInteger(n) || n <= 0)
    throw new CronError({
      code: CRON_ERROR_CODES.INVALID_CRON_EXPRESSION,
      message: "Hours must be an integer > 0.",
      cause: n,
    });
  return `0 0 */${n} * * *`;
}

export function cronAt(hhmm: string, dow?: number[] | "weekdays"): string {
  const { HH, MM } = parseHHmm(hhmm);

  const dowField =
    dow === "weekdays"
      ? "1-5"
      : Array.isArray(dow) && dow.length > 0
      ? dow.join(",")
      : "*";

  return `0 ${MM} ${HH} * * ${dowField}`;
}

export function cronMonthlyOnDay(day: number, hhmm: string): string {
  if (!Number.isInteger(day) || day < 1 || day > 31)
    throw new CronError({
      code: CRON_ERROR_CODES.INVALID_CRON_EXPRESSION,
      message: "The day of month must be an integer between 1 and 31.",
      cause: day,
    });

  const { HH, MM } = parseHHmm(hhmm);

  return `0 ${MM} ${HH} ${day} * *`;
}
