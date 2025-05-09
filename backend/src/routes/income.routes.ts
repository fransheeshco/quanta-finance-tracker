import express from 'express';
import { addIncome, deleteIncome, getIncome, updateIncome} from '../controllers/income.controller';
import { authToken } from '../middlewares/authToken';

const router = express.Router();

router.get("/getincomes", authToken, getIncome);
router.post("/addincome", authToken, addIncome);
router.delete("/deleteincome/:id", authToken, deleteIncome);
router.patch("/updateincome/:id", authToken, updateIncome)

export default router;