import { InvalidCronExpressionError } from "../errors";

// VO CronExpression: encapsula y valida una expresión cron como string.
export class CronExpressionVO {
  // ctor privado: obliga a construir el VO a través de create() para forzar validación.
  private constructor(public readonly _value: string) {}
  // create: punto único de creación; aplica validación básica (no vacío, tipo string).
  static create(expr: string): CronExpressionVO {
    // Validación laxa; el adaptador hará validación estricta.
    // valida que exista y sea string; el adaptador hará la validación estricta con la librería real.
    if (!expr || typeof expr !== "string")
      throw new InvalidCronExpressionError(
        "CronExpressionVO: invalid cron expression"
      );
    // normaliza espacios y crea el VO inmutable.
    return new CronExpressionVO(expr.trim());
  }

  get value(): string {
    return this._value;
  }

  toString(): string {
    return this._value;
  }
}
