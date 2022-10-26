import { WorkHandler } from "./WorkHandler";
import { WorkerEventData } from "./WorkerEventData";

const scope = self as unknown as Worker;

// Subscribe to the 'message' event
scope.addEventListener("message", (event: MessageEvent<WorkerEventData>) => {
  console.log("Webworker message:", event.data.message);

  const response = WorkHandler.handle(event.data.message);

  // send message back.
  scope.postMessage({ message: response } as WorkerEventData);
});

export {};
