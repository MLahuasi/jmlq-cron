# Express Integration — @jmlq/cron 🚏

## Example

```ts
import { createCron } from "@jmlq/cron";

const cron = createCron();

cron.create("0 0 * * *", async () => {
  console.log("job");
});
```
