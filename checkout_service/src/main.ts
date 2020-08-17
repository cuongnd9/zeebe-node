import express from "express";
import * as path from "path";
import { ZBClient } from "zeebe-node";
import { diana } from 'diana-js';

const app = express();

const zbc = new ZBClient();

const port = 3000;

app.use("/", express.static(path.join(__dirname, "..", "static")));

app.put("/api/cart/order", async (req, res) => {
  const { customerId } = req.params;

  const items = [
    {
      articleId: "123",
      amount: "1"
    }
  ];

  const customer = {
    customerId,
    name: "Camunda",
    address: "Zossener Strasse 55\n10961 Berlin\nGermany"
  };

  const order = {
    id: diana(),
    items,
    customer
  };

  const traceId = diana(24);

  const payload = {
    traceId,
    order
  };

  await zbc.createWorkflowInstance("order-zeebe-example", payload);
  res.json({ traceId });
});

app.listen(port, () =>
  console.log(`Web store running on http://localhost:${port}`)
);
