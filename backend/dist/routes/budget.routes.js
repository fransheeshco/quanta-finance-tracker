"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const budget_controller_1 = require("../controllers/budget.controller");
const authToken_1 = require("../middlewares/authToken");
const router = express_1.default.Router();
router.post('/createbudget', authToken_1.authToken, budget_controller_1.createBudget);
router.delete('/deletebudget/:id', authToken_1.authToken, budget_controller_1.deleteBudget);
router.patch('/updatebudget/:id', authToken_1.authToken, budget_controller_1.updateBudget);
router.get('/getbudgets', authToken_1.authToken, budget_controller_1.getBudgets);
exports.default = router;
