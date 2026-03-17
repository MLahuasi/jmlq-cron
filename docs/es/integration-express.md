# Integración con Express — @jmlq/cron 🚏

---

## Objetivo

Ejecutar tareas cron dentro de un API Express.

---

## Ejemplo real

```ts
import { createCron } from "@jmlq/cron";

export const cron = createCron();

cron.human.daily.at(
  "02:00",
  async () => {
    console.log("cleanup logs");
  },
  { name: "cleanup-logs" },
);
```

---

## Integración en bootstrap

```ts
import "./cron.jobs";
```

Esto asegura que los jobs se registren al iniciar la aplicación.

---

## Ejemplo limpieza de logs

```ts
cron.create(
  "0 0 \* \* \*",
  async () => {
    await logger.flush();
  },
  { name: "flush-logs" },
);
```

---

## ⬅️ Anterior

- [`arquitectura`](./architecture.md)

## ➡️ Siguiente

- [Configuración](./configuration.md)
- [Troubleshooting](./troubleshooting.md)
