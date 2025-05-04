import express from "express";
import { addAccount, deleteAccount, updateAccount, getAccounts } from "../controllers/account.controller";
import { authToken } from "../middlewares/authToken";

const router = express.Router();

router.post("/addaccount", authToken, addAccount);
router.delete("/deleteaccount/:id", authToken, deleteAccount);
router.patch("/updateaccount/:id", authToken, updateAccount);
router.get("/getaccounts/:id", authToken, getAccounts);

export default router;