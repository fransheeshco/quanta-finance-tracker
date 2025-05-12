import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.routes'; // Comment out this line
import userRoutes from './routes/user.routes';
import categoryRoutes from "./routes/category.routes";
import budgetRoutes from "./routes/budget.routes";
import transactionRoutes from "./routes/transactions.routes";
import savingsRoutes from "./routes/savings.routes";
import expensesRoutes from "./routes/expenses.routes";
import accountRoutes from "./routes/account.routes";
import incomeRoutes from "./routes/income.routes";
import transferRoute from "./routes/transfer.routes";
import path from 'path';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes); // Ensure this line is commented out
app.use('/api/auth/user', userRoutes) ;
//app.use('/api/auth/category', categoryRoutes);
//app.use('/api/auth/budgets', budgetRoutes);
//app.use('/api/auth/transaction', transactionRoutes);
//app.use('/api/auth/savings', savingsRoutes);
//app.use('/api/auth/expenses', expensesRoutes);
//app.use('/api/auth/account', accountRoutes);
//app.use('/api/auth/income', incomeRoutes);
//app.use('/api/auth/transfer', transferRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Root route working');
});

// Serve static files from your frontend build directory
const frontendBuildPath = path.join(__dirname, '../../client/build');
app.use(express.static(frontendBuildPath));


// Define a catch-all route to serve the frontend's index.html for all other requests
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(frontendBuildPath, 'index.html'));
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});