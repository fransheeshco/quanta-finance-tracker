import express from "express";
import { authToken } from "../middlewares/authToken";
import { createSavings, deleteSavings, getSavings, updateSavings } from "../controllers/savings.controller";

const router = express.Router();

router.post('/addsavings', authToken, createSavings);
router.patch('/updatesavings/:id', authToken, updateSavings);
router.delete('/deletesavings/:id', authToken, deleteSavings);
router.get('/getsavings', authToken, getSavings);

export default router;
