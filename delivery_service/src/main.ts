import { ZBClient } from "zeebe-node";

const zbc = new ZBClient();

zbc.createWorker({
  taskType: "ship-goods-z",
  taskHandler: (job, complete) => {
    console.log('🐳 delivery_service....');
    const { traceId, idDelivery } = job.variables;
    console.log('🆔 traceId', traceId);
    console.log('❓ idDelivery', idDelivery);
    complete.success({ traceId });
  }
});
