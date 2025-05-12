import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
// import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes'; // Keep this import
// ... other route imports

import path from 'path';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
// app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes) ; // Mount userRoutes under /api/user for now
// app.use('/api/auth/category', categoryRoutes);
// app.use('/api/auth/budgets', budgetRoutes);
// app.use('/api/auth/transaction', transactionRoutes);
// app.use('/api/auth/savings', savingsRoutes);
// app.use('/api/auth/expenses', expensesRoutes);
// app.use('/api/auth/account', accountRoutes);
// app.use('/api/auth/income', incomeRoutes);
// app.use('/api/auth/transfer', transferRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Root route working');
});

// Serve static files...
// app.use(express.static(frontendBuildPath));

// Catch-all route...
// app.get('*', ...);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});