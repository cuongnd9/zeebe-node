import { ZBClient } from "zeebe-node";
import * as path from "path";

const zbc = new ZBClient();

zbc
  .deployWorkflow(path.join(__dirname, "..", "bpmn", "order-zeebe.bpmn"))
  .then(console.log);

zbc.createWorker({
  taskType: "save-order-z",
  taskHandler: (job, complete) => {
    const { order } = job.variables;
    console.log(`Persisted order: ${JSON.stringify(order)}`);
    complete.success({ order });
  }
});
