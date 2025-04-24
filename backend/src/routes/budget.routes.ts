import express from 'express';
import { createBudget, deleteBudget, updateBudget, getBudgets } from '../controllers/budget.controller';
import { authToken } from '../middlewares/authToken';

const router = express.Router();

router.post('/createbudget', authToken, createBudget);
router.delete('/deletebudget', authToken, deleteBudget);
router.patch('/updatebudget', authToken, updateBudget);
router.get('/getbudgets', authToken, getBudgets);

export default router;
