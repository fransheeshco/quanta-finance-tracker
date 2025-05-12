"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const authToken_1 = require("../middlewares/authToken");
const router = express_1.default.Router();
router.get('/getuser', authToken_1.authToken, user_controller_1.getUserInfo);
exports.default = router;
