"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zeebe_node_1 = require("zeebe-node");
const zbc = new zeebe_node_1.ZBClient();
zbc.createWorker({
    taskType: "retrieve-payment-z",
    taskHandler: (job, complete) => {
        const { order, traceId, refId, amount } = job.variables;
        console.log(`Persisted order: ${JSON.stringify(order)}`);
        complete.success({ order });
    }
});
