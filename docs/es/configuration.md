# Configuración — @jmlq/cron ⚙️

---

## Variables de entorno

```
CRON_TIMEZONE=America/Guayaquil
CRON_SINGLETON=true
CRON_MUTEX_TTL_MS=60000
```

---

## Timezone

```ts
const scheduler = new NodeCronSchedulerAdapter({
  TIMEZONE: process.env.CRON_TIMEZONE,
});
```

---

## MUTEX TTL (ms)

Evita deadlocks.

---

## Singleton

Evita ejecución concurrente.

---

## Configuración completa

```ts
const scheduler = new NodeCronSchedulerAdapter({
  TIMEZONE: process.env.CRON_TIMEZONE,
  SINGLETON: process.env.CRON_SINGLETON === "true",
  MUTEX_TTL_MS: Number(process.env.CRON_MUTEX_TTL_MS),
});
```

---

## 📌 Menú

- [Arquitectura](../architecture.md)
- [Integración Express](./integration-express.md)
- [Troubleshooting](./troubleshooting.md)

---

## ⬅️ Anterior

- [`arquitectura`](./architecture.md)

## ➡️ Siguiente

- [Integración Express](./integration-express.md)
- [Troubleshooting](./troubleshooting.md)
