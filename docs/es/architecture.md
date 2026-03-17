# @jmlq/cron — Architecture 🏛️

---

## 🎯 Objetivo

Definir un sistema de planificación cron desacoplado de librerías externas utilizando Clean Architecture.

---

## ⭐ Importancia

Permite:

- reemplazar implementaciones de `cron`
- soportar múltiples infraestructuras
- facilitar testing

---

## 🧱 Componentes principales

### CronFacade

Fachada principal expuesta al usuario.

```ts
interface CronFacade {
  create(expression: string, task: JobHandler, options?: CronOptions);

  list();

  cancel(name: string);

  port();

  human;
}
```

---

### Factory

`createCron()`

Construye:

- `scheduler`
- `use cases`
- `facade`

---

### Scheduler Port

```ts
interface ISchedulerPort {
  schedule(expr: CronExpression, task: JobHandler);

  list();

  cancel(name: string);
}
```

---

### Adapter

`NodeCronSchedulerAdapter`

---

## Flujo interno

```mermaid
sequenceDiagram

participant User
participant CronFacade
participant ScheduleJobUseCase
participant CronExpression
participant SchedulerPort
participant NodeCronSchedulerAdapter
participant CronJob

User ->> CronFacade: create(expression, task)

CronFacade ->> ScheduleJobUseCase: scheduleJob()

ScheduleJobUseCase ->> CronExpression: create(expression)

ScheduleJobUseCase ->> SchedulerPort: schedule()

SchedulerPort ->> NodeCronSchedulerAdapter: schedule()

NodeCronSchedulerAdapter ->> CronJob: new CronJob()

CronJob -->> User: job scheduled
```

---

## Capas

- `Application`
- `Domain`
- `Infrastructure`

---

### Domain

- `CronExpression`
- `DayName`
- `JobHandler`

---

### Application

- `CronFacade`
- `UseCases`
- `HumanCronService`
- `createCron` `factory`

---

### Infrastructure

- `NodeCronSchedulerAdapter`
- `InMemoryMutexAdapter`

---

### Librería externa

`cron`

---

## ⬅️ Anterior

- [`inicio`](../../README.es.md)

## ➡️ Siguiente

- [Configuración](./configuration.md)
- [Integración Express](./integration-express.md)
- [Troubleshooting](./troubleshooting.md)
