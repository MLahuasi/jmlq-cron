import { CronError } from ".";
import { CRON_ERROR_CODES } from "../types";

export class InvalidCronExpressionError extends CronError {
  constructor(expr: string, cause?: unknown) {
    super({
      code: CRON_ERROR_CODES.INVALID_CRON_EXPRESSION,
      message: `Invalid cron expression: "${expr}"`,
      cause,
    });
    this.name = "InvalidCronExpressionError";
  }
}
