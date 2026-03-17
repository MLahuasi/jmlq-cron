import type { DayName } from "../../../domain/value-objects";
import { CRON_ERROR_CODES, JobHandler } from "../../../domain/types";
import { ICronOptions } from "../../../domain/ports";
import { CronFacade } from "../../facade";
import {
  DayToDOW,
  cronEverySeconds,
  cronEveryMinutes,
  cronEveryHours,
  cronAt,
  cronMonthlyOnDay,
} from ".";
import { CronError } from "../../../domain/errors";

// Contrato de la API humana
export interface HumanCron {
  every: {
    seconds(n: number, task: JobHandler, opts?: ICronOptions): void;
    minutes(n: number, task: JobHandler, opts?: ICronOptions): void;
    hours(n: number, task: JobHandler, opts?: ICronOptions): void;
  };

  daily: {
    at(hhmm: string, task: JobHandler, opts?: ICronOptions): void;
  };

  weekdays: {
    at(hhmm: string, task: JobHandler, opts?: ICronOptions): void;
  };

  on(days: DayName[]): {
    at(hhmm: string, task: JobHandler, opts?: ICronOptions): void;
  };

  monthly: {
    onDay(day: number): {
      at(hhmm: string, task: JobHandler, opts?: ICronOptions): void;
    };
  };
}

/** Construye la API humana delegando en facade.create() */
export function makeHumanCron(facade: CronFacade): HumanCron {
  return {
    every: {
      seconds: (n, task, opts) =>
        facade.create(cronEverySeconds(n), task, opts),

      minutes: (n, task, opts) =>
        facade.create(cronEveryMinutes(n), task, opts),

      hours: (n, task, opts) => facade.create(cronEveryHours(n), task, opts),
    },

    daily: {
      at: (hhmm, task, opts) => facade.create(cronAt(hhmm), task, opts),
    },

    weekdays: {
      at: (hhmm, task, opts) =>
        facade.create(cronAt(hhmm, "weekdays"), task, opts),
    },

    on: (days) => ({
      at: (hhmm, task, opts) => {
        if (!Array.isArray(days) || days.length === 0) {
          throw new CronError({
            code: CRON_ERROR_CODES.INVALID_CRON_EXPRESSION,
            message: "You must specify at least one day.",
            cause: days,
          });
        }

        const dow = days.map((d) => DayToDOW[d]);
        facade.create(cronAt(hhmm, dow), task, opts);
      },
    }),

    monthly: {
      onDay: (day) => ({
        at: (hhmm, task, opts) =>
          facade.create(cronMonthlyOnDay(day, hhmm), task, opts),
      }),
    },
  };
}
