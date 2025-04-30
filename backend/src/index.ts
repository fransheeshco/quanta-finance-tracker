import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import categoryRoutes from "./routes/category.routes";
import budgetRoutes from "./routes/budget.routes";
import transactionRoutes from "./routes/transactions.routes";
import savingsRoutes from "./routes/savings.routes";
import expensesRoutes from "./routes/expenses.routes";
import accountRoutes from "./routes/account.routes";
import incomeRoutes from "./routes/income.routes";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/auth/user', userRoutes) ;
app.use('/api/auth/category', categoryRoutes);
app.use('/api/auth/budgets', budgetRoutes);
app.use('/api/auth/transaction', transactionRoutes);
app.use('/api/auth/savings', savingsRoutes);
app.use('/api/auth/expenses', expensesRoutes);
app.use('/api/auth/account', accountRoutes);
app.use('/api/auth/income', incomeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
