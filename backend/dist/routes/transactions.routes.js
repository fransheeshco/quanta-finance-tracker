"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authToken_1 = require("../middlewares/authToken");
const transaction_controller_1 = require("../controllers/transaction.controller");
const router = express_1.default.Router();
router.post('/addtransaction', authToken_1.authToken, transaction_controller_1.createTransaction);
router.patch('/updatetransaction/:id', authToken_1.authToken, transaction_controller_1.updateTransaction);
router.delete('/deletetransaction/:id', authToken_1.authToken, transaction_controller_1.deleteTransaction);
router.get('/gettransactions', authToken_1.authToken, transaction_controller_1.getTransactions);
exports.default = router;
