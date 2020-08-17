import { ZBClient } from "zeebe-node";

const zbc = new ZBClient();

zbc.createWorker({
  taskType: "fetch-goods-z",
  taskHandler: (job, complete) => {
    console.log("Fetch goods");
    const { order, traceId, refId, amount } = job.variables;
    console.log(`Persisted order: ${JSON.stringify(order)}`);
    complete.success({ order });
  }
});
