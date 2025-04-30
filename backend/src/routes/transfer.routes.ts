import express from "express";
import {createTransfer } from "../controllers/transfer.controller";
import { authToken } from "../middlewares/authToken";

const router = express.Router();

router.post("/transferto", authToken, createTransfer);

export default router;