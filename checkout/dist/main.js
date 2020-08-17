"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path = __importStar(require("path"));
const uuid = __importStar(require("uuid"));
const zeebe_node_1 = require("zeebe-node");
const app = express_1.default();
const zbc = new zeebe_node_1.ZBClient();
const port = 3000;
app.use("/", express_1.default.static(path.join(__dirname, "..", "static")));
app.put("/api/cart/order", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        items,
        customer
    };
    const traceId = uuid.v4();
    const payload = {
        traceId,
        order
    };
    yield zbc.createWorkflowInstance("order-zeebe", payload);
    res.json({ traceId });
}));
app.listen(port, () => console.log(`Web store running on http://localhost:${port}`));
