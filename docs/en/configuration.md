# Configuration — @jmlq/cron ⚙️

---

## Environment variables

```id="0g7d2m"
CRON_TIMEZONE=America/Guayaquil
CRON_SINGLETON=true
CRON_MUTEX_TTL_MS=60000
```

---

## Timezone

```ts id="v9y1x3"
const scheduler = new NodeCronSchedulerAdapter({
  TIMEZONE: process.env.CRON_TIMEZONE,
});
```

---

## MUTEX TTL (ms)

Prevents deadlocks.

---

## Singleton

Prevents concurrent execution.

---

## Full configuration

```ts id="m1k9sd"
const scheduler = new NodeCronSchedulerAdapter({
  TIMEZONE: process.env.CRON_TIMEZONE,
  SINGLETON: process.env.CRON_SINGLETON === "true",
  MUTEX_TTL_MS: Number(process.env.CRON_MUTEX_TTL_MS),
});
```

---

## 📌 Menu

- [Architecture](../architecture.md)
- [Express Integration](./integration-express.md)
- [Troubleshooting](./troubleshooting.md)

---

## ⬅️ Previous

- [`architecture`](./architecture.md)

## ➡️ Next

- [Express Integration](./integration-express.md)
- [Troubleshooting](./troubleshooting.md)
