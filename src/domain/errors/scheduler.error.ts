import { CronError } from ".";
import { SchedulerErrorCode } from "../types";

export interface ISchedulerErrorParams {
  code: SchedulerErrorCode;
  message: string;
  cause?: unknown;
}

export class SchedulerError extends CronError {
  public readonly schedulerCode: SchedulerErrorCode;

  constructor(params: ISchedulerErrorParams) {
    super({
      code: params.code, // ✅ SchedulerErrorCode ⊂ CronErrorCode
      message: params.message,
      cause: params.cause,
    });

    this.name = "SchedulerError";
    this.schedulerCode = params.code;
  }
}
