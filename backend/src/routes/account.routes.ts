import express from "express";
import { addAccount, deleteAccount } from "../controllers/account.controller";
import { authToken } from "../middlewares/authToken";

const router = express.Router();

router.post("/addaccount", authToken, addAccount);
router.post("/deleteaccount", authToken, deleteAccount);

export default router;