# @jmlq/cron 🧩

Es una librería basada en cron diseñada con **Principios de Arquitectura Limpia**.

`@jmlq/cron` ofrece una forma sencilla y extensible de programar tareas en segundo plano en aplicaciones `Node.js` sin vincular la lógica de negocio a una implementación de `cron` específica.

Encapsula el paquete npm `cron` mediante **Puertos y Adaptadores**, lo que expone una interfaz sencilla y una API de programación intuitiva.

---

## 🎯 Objetivo

Proporcionar una librería para planificar tareas cron de forma **tipada**, **extensible** y **desacoplada** de la infraestructura.

El paquete abstrae la librería `cron` mediante un puerto (`ISchedulerPort`) y un adaptador (`NodeCronSchedulerAdapter`), permitiendo reemplazar implementaciones sin modificar la lógica de negocio.

---

## ⭐ Importancia

En aplicaciones backend es común ejecutar tareas programadas como:

- limpieza de logs
- envío de emails
- generación de reportes
- sincronización de datos
- mantenimiento de cachés

Este paquete permite implementar estas tareas manteniendo:

- Clean Architecture
- separación de responsabilidades
- control de concurrencia
- código testeable

---

## 🏗️ Arquitectura (visión rápida)

El paquete sigue **Clean Architecture**:

Application → Domain ← Infrastructure

Componentes principales:

- `CronFacade`
- `createCron()`
- `HumanCronService`
- `NodeCronSchedulerAdapter`

➡️ Ver detalle en: [architecture.md](./architecture.md)

---

## 🔧 Implementación

### 5.1 Instalación

```
npm i @jmlq/cron
```

---

### 5.2 Dependencias

Dependencia principal:

- `cron`

La librería externa se adapta mediante:

`NodeCronSchedulerAdapter`

---

### 5.3 Quickstart (implementación rápida)

```ts
import { createCron } from "@jmlq/cron";

const cron = createCron();

cron.create(
  "_/5 _ \* \* \*",
  async () => {
    console.log("heartbeat");
  },
  { name: "heartbeat" },
);
```

---

### 5.4 Variables de entorno (.env) 📦

Ejemplo usado en infraestructura del API:

```
CRON_TIMEZONE=America/Guayaquil
CRON_SINGLETON=true
CRON_MUTEX_TTL_MS=60000
```

Consumo típico:

```ts
const scheduler = new NodeCronSchedulerAdapter({
  TIMEZONE: process.env.CRON_TIMEZONE,
  SINGLETON: process.env.CRON_SINGLETON === "true",
  MUTEX_TTL_MS: Number(process.env.CRON_MUTEX_TTL_MS),
});
```

---

### 5.5 Helpers y funcionalidades clave

Human Cron API:

```ts
cron.human.daily.at("08:30", task);

cron.human.weekdays.at("09:00", task);

cron.human.on(["Mon", "Wed"]).at("06:00", task);
```

---

Singleton jobs:

```ts
cron.create("_/5 _ \* \* \*", task, { name: "heartbeat", singleton: true });
```

---

Mutex distribuido:

`IMutexPort`

Ejemplo implementación externa:

`RedisMutexAdapter`

---

## ✅ Checklist (pasos rápidos)

- [Instalar paquete](#51-instalación)
- [Crear CronFacade](./docs/es/architecture.md#cronfacade)
- [Configurar timezone](./docs/es/configuration.md#timezone)
- [Integrar en Express](./docs/es/integration-express.md)
- [Ver troubleshooting](./docs/es/troubleshooting.md)

---

## 📌 Menú

- [Arquitectura](./docs/es/architecture.md)
- [Configuración](./docs/es/configuration.md)
- [Integración Express](./docs/es/integration-express.md)
- [Troubleshooting](./docs/es/troubleshooting.md)

## ⬅️ 🌐 Ecosistema

- [`@jmlq`](https://github.com/MLahuasi/jmlq-ecosystem#readme)
