import { IMutex } from "../../domain";

/** Mutex simple in-memory (mejor usar Redis/DB en producción multi-instancia). */
// Implementación mínima in-memory del IMutex (no apta para multi-nodo/escala).
export class InMemoryMutexAdapter implements IMutex {
  // Mapa key→expiresAt (timestamp). Si ahora < expiresAt, el lock sigue tomado.
  private readonly locks = new Map<string, number>(); // key -> expiresAt

  // acquire: intenta tomar el lock si está libre o expirado; retorna true/false.
  async acquire(key: string, ttlMs: number): Promise<boolean> {
    // obtiene la hora actual para comparar expiración.
    const now = Date.now();
    // lee la expiración previa (si existe) para decidir si aún está bloqueado.
    const exp = this.locks.get(key);
    // si hay expiración futura, alguien posee el lock → no se puede adquirir.
    if (exp && exp > now) return false;
    // toma el lock registrando nueva expiración now+ttl.
    this.locks.set(key, now + ttlMs);
    return true;
  }

  // release: libera el lock eliminando la entrada del mapa.
  async release(key: string): Promise<void> {
    this.locks.delete(key);
  }
}
