import express from 'express';
import { addIncome, deleteIncome, getIncome} from '../controllers/income.controller';
import { authToken } from '../middlewares/authToken';

const router = express.Router();

router.get("/getincomes", authToken, getIncome);
router.post("/addincome", authToken, addIncome);
router.delete("/deleteincome", authToken, deleteIncome);

export default router;