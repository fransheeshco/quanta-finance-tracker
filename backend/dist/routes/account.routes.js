"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const account_controller_1 = require("../controllers/account.controller");
const authToken_1 = require("../middlewares/authToken");
const router = express_1.default.Router();
router.post("/addaccount", authToken_1.authToken, account_controller_1.addAccount);
router.delete("/deleteaccount/:id", authToken_1.authToken, account_controller_1.deleteAccount);
router.patch("/updateaccount/:id", authToken_1.authToken, account_controller_1.updateAccount);
router.get("/getaccounts/", authToken_1.authToken, account_controller_1.getAccounts);
router.get("/gettotal", authToken_1.authToken, account_controller_1.totalBalance);
exports.default = router;
