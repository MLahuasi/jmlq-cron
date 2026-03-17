/**
 * IMutex:
 * Puerto para bloqueo (mutex) distribuido o local.
 */
export interface IMutex {
  /**
   * Intenta adquirir un lock para una clave durante cierto TTL.
   * @returns true si el lock fue adquirido.
   */
  acquire(key: string, ttlMs: number): Promise<boolean>;

  /** Libera el lock. */
  release(key: string): Promise<void>;
}
