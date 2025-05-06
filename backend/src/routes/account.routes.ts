import express from "express";
import { addAccount, deleteAccount, updateAccount, getAccounts, totalBalance } from "../controllers/account.controller";
import { authToken } from "../middlewares/authToken";

const router = express.Router();

router.post("/addaccount", authToken, addAccount);
router.delete("/deleteaccount/:id", authToken, deleteAccount);
router.patch("/updateaccount/:id", authToken, updateAccount);
router.get("/getaccounts/", authToken, getAccounts);
router.get("/gettotal", authToken, totalBalance);

export default router;