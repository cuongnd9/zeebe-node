import { ZBClient } from "zeebe-node";
import * as path from "path";

const zbc = new ZBClient();

zbc
  .deployWorkflow(path.join(__dirname, "..", "bpmn", "order-zeebe-example.bpmn"))
  .then(console.log);

zbc.createWorker({
  taskType: "save-order-z",
  taskHandler: (job, complete) => {
    console.log('🦄 order_service...');
    const { order, traceId } = job.variables;
    console.log('💵 order', order);
    console.log('🆔 traceId', traceId);
    const total = 1000;
    complete.success({ traceId, order, total });
  }
});
