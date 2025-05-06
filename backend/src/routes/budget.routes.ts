import express from 'express';
import { createBudget, deleteBudget, updateBudget, getBudgets } from '../controllers/budget.controller';
import { authToken } from '../middlewares/authToken';

const router = express.Router();

router.post('/createbudget', authToken, createBudget);
router.delete('/deletebudget/:id', authToken, deleteBudget);
router.patch('/updatebudget/:id', authToken, updateBudget);
router.get('/getbudgets', authToken, getBudgets);

export default router;
