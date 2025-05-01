import express from "express";
import {createTransfer, getAndSortByDate } from "../controllers/transfer.controller";
import { authToken } from "../middlewares/authToken";

const router = express.Router();

router.post("/transferto", authToken, createTransfer);
router.get("/getandsortbydate", authToken, getAndSortByDate);

export default router;