# Troubleshooting — @jmlq/cron 🩺

---

## Jobs not running

Verify that:

```ts id="k8m2zx"
cron.create();
```

has been executed and that the process is running.

---

## Duplicate execution

Enable:

```ts id="v2x9qa"
singleton: true;
```

---

## Multi-instance

Use a distributed mutex:

`RedisMutexAdapter`

---

## Incorrect timezone

Configure:

`CRON_TIMEZONE`

---

---

## ⬅️ Previous

- [`architecture`](./architecture.md)

## ➡️ Next

- [Configuration](./configuration.md)
- [Express Integration](./integration-express.md)
