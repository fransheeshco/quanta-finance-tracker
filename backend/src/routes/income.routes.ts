import express from 'express';
import { addIncome, deleteIncome } from '../controllers/income.controller';
import { authToken } from '../middlewares/authToken';

const router = express.Router();

router.post("/addincome", authToken, addIncome);
router.delete("/deleteincome", authToken, deleteIncome);

export default router;