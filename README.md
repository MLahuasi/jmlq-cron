# @jmlq/cron 🧩

A cron-based library designed with **Clean Architecture principles**.

`@jmlq/cron` provides a simple and extensible way to schedule background tasks in `Node.js` applications without coupling business logic to a specific `cron` implementation.

It encapsulates the npm package `cron` using **Ports and Adapters**, exposing a clean interface and an intuitive scheduling API.

---

## 🎯 Objective

Provide a library to schedule cron jobs in a **typed**, **extensible**, and **infrastructure-agnostic** way.

The package abstracts the `cron` library through a port (`ISchedulerPort`) and an adapter (`NodeCronSchedulerAdapter`), allowing implementations to be replaced without modifying business logic.

---

## ⭐ Importance

In backend applications, it is common to run scheduled tasks such as:

- log cleanup
- email sending
- report generation
- data synchronization
- cache maintenance

This package enables these tasks while preserving:

- Clean Architecture
- separation of concerns
- concurrency control
- testable code

---

## 🏗️ Architecture (quick view)

The package follows **Clean Architecture**:

Application → Domain ← Infrastructure

Main components:

- `CronFacade`
- `createCron()`
- `HumanCronService`
- `NodeCronSchedulerAdapter`

➡️ See details: [architecture.md](./architecture.md)

---

## 🔧 Implementation

### 5.1 Installation

```
npm i @jmlq/cron
```

---

### 5.2 Dependencies

Main dependency:

- `cron`

The external library is adapted through:

`NodeCronSchedulerAdapter`

---

### 5.3 Quickstart (rapid implementation)

```ts
import { createCron } from "@jmlq/cron";

const cron = createCron();

cron.create(
  "*/5 * * * *",
  async () => {
    console.log("heartbeat");
  },
  { name: "heartbeat" },
);
```

---

### 5.4 Environment variables (.env) 📦

Example used in API infrastructure:

```
CRON_TIMEZONE=America/Guayaquil
CRON_SINGLETON=true
CRON_MUTEX_TTL_MS=60000
```

Typical usage:

```ts
const scheduler = new NodeCronSchedulerAdapter({
  TIMEZONE: process.env.CRON_TIMEZONE,
  SINGLETON: process.env.CRON_SINGLETON === "true",
  MUTEX_TTL_MS: Number(process.env.CRON_MUTEX_TTL_MS),
});
```

---

### 5.5 Helpers and key features

Human Cron API:

```ts
cron.human.daily.at("08:30", task);

cron.human.weekdays.at("09:00", task);

cron.human.on(["Mon", "Wed"]).at("06:00", task);
```

---

Singleton jobs:

```ts
cron.create("*/5 * * * *", task, { name: "heartbeat", singleton: true });
```

---

Distributed mutex:

`IMutexPort`

Example external implementation:

`RedisMutexAdapter`

---

## ✅ Checklist (quick steps)

- [Install package](#51-installation)
- [Create CronFacade](./docs/en/architecture.md#cronfacade)
- [Configure timezone](./docs/en/configuration.md#timezone)
- [Integrate with Express](./docs/en/integration-express.md)
- [Check troubleshooting](./docs/en/troubleshooting.md)

---

## 📌 Menu

- [Architecture](./docs/en/architecture.md)
- [Configuration](./docs/en/configuration.md)
- [Express Integration](./docs/en/integration-express.md)
- [Troubleshooting](./docs/en/troubleshooting.md)

## ⬅️ 🌐 Ecosystem

- [`@jmlq`](https://github.com/MLahuasi/jmlq-ecosystem#readme)
