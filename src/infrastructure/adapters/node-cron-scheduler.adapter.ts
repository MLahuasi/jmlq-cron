import { CronJob } from "cron";
import { randomUUID } from "node:crypto";
import {
  ICronOptions,
  IMutex,
  ISchedulerPort,
  IJobHandle,
} from "../../domain/ports";
import { CRON_ERROR_CODES, JobHandler } from "../../domain/types";
import { DEFAULT_CRON_CONFIG } from "../../application/config";
import { InMemoryMutexAdapter } from ".";
import { SchedulerError } from "../../domain/errors";

// ─────────────────────────────────────────────
// Handle (interno)
// ─────────────────────────────────────────────

class NodeCronJobHandle implements IJobHandle {
  constructor(
    public readonly id: string,
    public readonly name: string,
    private readonly job: CronJob
  ) {}

  isRunning(): boolean {
    return this.job.isActive;
  }

  start(): void {
    try {
      this.job.start();
    } catch (e) {
      throw new SchedulerError({
        code: CRON_ERROR_CODES.SCHEDULER_START_FAILED,
        message: `Failed to start job "${this.name}".`,
        cause: e,
      });
    }
  }

  stop(): void {
    try {
      this.job.stop();
    } catch (e) {
      throw new SchedulerError({
        code: CRON_ERROR_CODES.SCHEDULER_STOP_FAILED,
        message: `Failed to stop job "${this.name}".`,
        cause: e,
      });
    }
  }

  cancel(): void {
    this.job.stop();
  }

  nextDateISO(): string | null {
    try {
      return this.job.nextDate().toJSDate().toISOString();
    } catch {
      return null;
    }
  }
}

// ─────────────────────────────────────────────
// Scheduler (adapter público)
// ─────────────────────────────────────────────

export class NodeCronSchedulerAdapter implements ISchedulerPort {
  private readonly registry = new Map<string, IJobHandle>(); // name -> handle

  constructor(
    private readonly config = DEFAULT_CRON_CONFIG,
    private readonly mutexFactory: () => IMutex = () =>
      new InMemoryMutexAdapter()
  ) {}

  schedule(
    cronTime: string,
    task: JobHandler,
    options: ICronOptions = {}
  ): IJobHandle {
    const name = options.name ?? `job:${cryptoSafeId()}`;

    if (this.registry.has(name)) {
      // si ya hay un job con ese nombre, lo cancelamos para reemplazar (idempotencia)
      this.cancel(name);
    }

    const timezone = options.timezone ?? this.config.TIMEZONE;
    const singleton = options.singleton ?? this.config.SINGLETON;
    const ttlMs = this.config.MUTEX_TTL_MS;

    const mutex: IMutex = options.mutex ?? this.mutexFactory();
    const lockKey = `cron:${name}`;

    const wrapped = async () => {
      if (singleton) {
        const ok = await mutex.acquire(lockKey, ttlMs);
        if (!ok) return;
      }

      try {
        await task();
      } finally {
        if (singleton) {
          await mutex.release(lockKey);
        }
      }
    };

    try {
      const job = new CronJob(cronTime, wrapped, null, false, timezone);
      const handle = new NodeCronJobHandle(randomUUID(), name, job);

      this.registry.set(name, handle);

      if (options.runOnInit) {
        // Aquí el error viene del task del usuario; si se lo quiere silenciar,
        // está bien dejar el catch vacío. Si se quiere centralizar también esto,
        // se podría loguear o envolver en CronError antes de propagar.
        Promise.resolve()
          .then(wrapped)
          .catch(() => void 0);
      }

      job.start();
      return handle;
    } catch (e) {
      // Cualquier fallo en la creación/arranque del CronJob se traduce a SchedulerError
      throw new SchedulerError({
        code: CRON_ERROR_CODES.SCHEDULER_START_FAILED,
        message: `Failed to schedule job "${name}" with cron "${cronTime}".`,
        cause: e,
      });
    }
  }

  list(): IJobHandle[] {
    return [...this.registry.values()];
  }

  findByName(name: string): IJobHandle | undefined {
    return this.registry.get(name);
  }

  cancel(name: string): void {
    const h = this.registry.get(name);
    if (h) {
      h.cancel();
      this.registry.delete(name);
    }
  }
}

// id seguro si randomUUID no está disponible (Node >=16 lo tiene)
function cryptoSafeId() {
  try {
    return randomUUID();
  } catch {
    return Math.random().toString(36).slice(2);
  }
}
