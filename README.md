# webworker extension demo

## _A Foxglove Studio Extension Demo_

This is a simple [Foxglove Studio](http://foxglove.dev/studio) extension panel that shows how to use a `WebWorker`.

## Key poits:

### packages

You'll need the `worker-loader` package. This is actually marked as depricated, but I haven't found
a way to use the `Webpack 5` way of integrating workers yet. So for now, we use the older loader. 

### config.ts

Configure the `worker-loader` and force it to inline the worker code. 

### typings/index.d.ts

Enable to import workers via some TS magic. 

### My.worker.ts
The worker code. 

*NOTE:* Your worker needs to be in a file named `*.worker.ts`, otherwise the loading wont work. 

### ExamplePanel.tsx

Import the worker:

```typescript
import Worker from "./My.worker.ts";
```

Create it:
```typescript
  // Create webworker and subscribe to 'message' event.
  const worker = useMemo(() => {
    const result = new Worker();
    result.addEventListener("message", onWorkerMessage);
    return result;
  }, [onWorkerMessage]);
```
