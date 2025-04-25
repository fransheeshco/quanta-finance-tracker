import express from 'express';
import { authToken } from '../middlewares/authToken';
import { createTransaction, deleteTransaction, getTransactions, updateTransaction } from '../controllers/transaction.controller';

const router = express.Router();

router.post('/addtransaction', authToken, createTransaction);
router.patch('/updatetransaction', authToken, updateTransaction);
router.delete('/deletetransaction', authToken, deleteTransaction);
router.get('gettransactions', authToken, getTransactions);

export default router;