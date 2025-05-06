import express from "express";
import { createExpense, deleteExpense, updateExpense, getExpense } from "../controllers/expenses.controller";
import { authToken } from "../middlewares/authToken";

const router = express.Router();

router.post('/addexpenses', authToken, createExpense);
router.patch('/updateexpenses/:id', authToken, updateExpense);
router.delete('/deleteexpense/:id', authToken, deleteExpense);
router.get('/getexpenses', authToken, getExpense);
router.get('/getexpenses/bycategory', authToken, getExpense);

export default router;