"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const income_controller_1 = require("../controllers/income.controller");
const authToken_1 = require("../middlewares/authToken");
const router = express_1.default.Router();
router.get("/getincomes", authToken_1.authToken, income_controller_1.getIncome);
router.post("/addincome", authToken_1.authToken, income_controller_1.addIncome);
router.delete("/deleteincome/:id", authToken_1.authToken, income_controller_1.deleteIncome);
router.patch("/updateincome/:id", authToken_1.authToken, income_controller_1.updateIncome);
exports.default = router;
