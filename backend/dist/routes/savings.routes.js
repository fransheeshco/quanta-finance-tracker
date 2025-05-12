"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authToken_1 = require("../middlewares/authToken");
const savings_controller_1 = require("../controllers/savings.controller");
const router = express_1.default.Router();
router.post('/addsavings', authToken_1.authToken, savings_controller_1.createSavings);
router.patch('/updatesavings/:id', authToken_1.authToken, savings_controller_1.updateSavings);
router.delete('/deletesavings/:id', authToken_1.authToken, savings_controller_1.deleteSavings);
router.get('/getsavings', authToken_1.authToken, savings_controller_1.getSavings);
exports.default = router;
