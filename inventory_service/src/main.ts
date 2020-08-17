import { ZBClient } from "zeebe-node";

const zbc = new ZBClient();

zbc.createWorker({
  taskType: "fetch-goods-z",
  taskHandler: (job, complete) => {
    console.log('🤡 inventory_service....');
    const { traceId, isPayment } = job.variables;
    console.log('🆔 traceId', traceId);
    console.log('❓ isPayment', isPayment);
    const idDelivery = true;
    complete.success({ traceId, idDelivery });
  }
});
