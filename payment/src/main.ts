import { ZBClient } from "zeebe-node";

const zbc = new ZBClient();

zbc.createWorker({
  taskType: "retrieve-payment-z",
  taskHandler: (job, complete) => {
    const { order, traceId, refId, amount } = job.variables;
    console.log(`Persisted order: ${JSON.stringify(order)}`);
    complete.success({ order });
  }
});
