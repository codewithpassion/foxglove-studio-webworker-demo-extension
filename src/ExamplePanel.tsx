import { PanelExtensionContext } from "@foxglove/studio";
import { useMemo, useCallback, useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

import Worker from "./My.worker.ts";
import { WorkerEventData } from "./WorkerEventData";

function ExamplePanel(): JSX.Element {
  // Webworker message callback.
  const onWorkerMessage = useCallback((data: globalThis.MessageEvent<WorkerEventData>) => {
    console.log(`Message from WebWorker: ${data.data.message}`);
    setResponse(data.data.message);
  }, []);

  // Create webworker and subscribe to 'message' event.
  const worker = useMemo(() => {
    const result = new Worker();
    result.addEventListener("message", onWorkerMessage);
    return result;
  }, [onWorkerMessage]);

  // start interval to send message to worker.
  const buttonClicked = useCallback(() => {
    setTimeoutVal(5);
    setResponse(undefined);
    const intv = setInterval(() => {
      setResponse(undefined);
      if (timeoutRef.current > 0) {
        setTimeoutVal(timeoutRef.current - 1);
      } else {
        // send message.
        worker.postMessage({ message: "Hello World" } as WorkerEventData);
        clearInterval(intv);
      }
    }, 1000);
  }, [worker]);

  const [timeoutVal, setTimeoutVal] = useState(0);
  const [response, setResponse] = useState<string | undefined>(undefined);

  const timeoutRef = useRef(0); // need to use a ref so that the interval can access the value
  useEffect(() => {
    timeoutRef.current = timeoutVal;
  }, [timeoutVal]);

  return (
    <div style={{ height: "100%", padding: "1rem" }}>
      <div style={{ paddingBottom: "1rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <button onClick={buttonClicked}>Press me</button>
      </div>
      {timeoutVal > 0 && (
        <div
          style={{ paddingBottom: "1rem", display: "flex", gap: "0.5rem", alignItems: "center" }}
        >
          Sending message message in: {timeoutVal}
        </div>
      )}
      {response != undefined && (
        <div
          style={{ paddingBottom: "1rem", display: "flex", gap: "0.5rem", alignItems: "center" }}
        >
          Response: {response}
        </div>
      )}
    </div>
  );
}

export function initExamplePanel(context: PanelExtensionContext): void {
  ReactDOM.render(<ExamplePanel />, context.panelElement);
}
