"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// In authRoutes.ts
const express_1 = __importDefault(require("express"));
// import { login, signUp } from '../controllers/auth.controller'; // Comment this out
const router = express_1.default.Router();
router.post('/signup', (req, res) => {
    res.send('Signup route hit');
});
router.post('/login', (req, res) => {
    res.send('Login route hit');
});
exports.default = router;
