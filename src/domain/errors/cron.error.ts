import { CronErrorCode } from "../types";

export interface ICronErrorParams {
  code: CronErrorCode;
  message: string;
  cause?: unknown;
}

export class CronError extends Error {
  public readonly code: CronErrorCode;
  public readonly cause?: unknown;

  constructor(params: ICronErrorParams) {
    super(params.message);
    this.name = "CronError";
    this.code = params.code;
    this.cause = params.cause;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CronError);
    }
  }
}
