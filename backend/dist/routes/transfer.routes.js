"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transfer_controller_1 = require("../controllers/transfer.controller");
const authToken_1 = require("../middlewares/authToken");
const router = express_1.default.Router();
router.post("/transfer", authToken_1.authToken, transfer_controller_1.createTransfer);
router.get("/getandsortbydate", authToken_1.authToken, transfer_controller_1.getAndSortByDate);
exports.default = router;
