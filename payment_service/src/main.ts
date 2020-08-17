import { ZBClient } from "zeebe-node";

const zbc = new ZBClient();

zbc.createWorker({
  taskType: "retrieve-payment-z",
  taskHandler: (job, complete) => {
    console.log('🌼 payment_service...');
    const { traceId, total, amount, refId } = job.variables;
    console.log('🆔 traceId', traceId);
    console.log('💵 total', total);
    console.log('👻 amount, refId', amount, refId);
    const isPayment = true;
    complete.success({ traceId, isPayment });
  }
});
