"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expenses_controller_1 = require("../controllers/expenses.controller");
const authToken_1 = require("../middlewares/authToken");
const router = express_1.default.Router();
router.post('/addexpenses', authToken_1.authToken, expenses_controller_1.createExpense);
router.patch('/updateexpenses/:id', authToken_1.authToken, expenses_controller_1.updateExpense);
router.delete('/deleteexpense/:id', authToken_1.authToken, expenses_controller_1.deleteExpense);
router.get('/getexpenses', authToken_1.authToken, expenses_controller_1.getExpense);
router.get('/gettotalexpense', authToken_1.authToken, expenses_controller_1.addAllExpenses);
router.get('/getexpenses/bycategory', authToken_1.authToken, expenses_controller_1.getExpense);
exports.default = router;
