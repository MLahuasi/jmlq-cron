import { CronError } from ".";
import { CRON_ERROR_CODES } from "../types";

export class JobNotFoundError extends CronError {
  public readonly jobId: string;

  constructor(jobId: string, cause?: unknown) {
    super({
      code: CRON_ERROR_CODES.JOB_NOT_FOUND,
      message: `No job was found with id "${jobId}".`,
      cause,
    });

    this.name = "JobNotFoundError";
    this.jobId = jobId;
  }
}
