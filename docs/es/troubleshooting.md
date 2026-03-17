# Troubleshooting — @jmlq/cron 🩺

---

## Jobs no ejecutan

Verificar que:

```ts
cron.create();
```

haya sido ejecutado y que el proceso esté corriendo.

---

## Ejecución duplicada

Activar:

```ts
singleton: true;
```

---

## Multi instancia

Usar mutex distribuido:

`RedisMutexAdapter`

---

## Zona horaria incorrecta

Configurar:

`CRON_TIMEZONE`

---

---

## ⬅️ Anterior

- [`arquitectura`](./architecture.md)

## ➡️ Siguiente

- [Configuración](./configuration.md)
- [Integración Express](./integration-express.md)
