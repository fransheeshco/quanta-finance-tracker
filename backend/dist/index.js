"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
// import authRoutes from './routes/auth.routes';
const user_routes_1 = __importDefault(require("./routes/user.routes")); // Keep this import
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// API Routes
// app.use('/api/auth', authRoutes);
app.use('/api/user', user_routes_1.default); // Mount userRoutes under /api/user for now
// app.use('/api/auth/category', categoryRoutes);
// app.use('/api/auth/budgets', budgetRoutes);
// app.use('/api/auth/transaction', transactionRoutes);
// app.use('/api/auth/savings', savingsRoutes);
// app.use('/api/auth/expenses', expensesRoutes);
// app.use('/api/auth/account', accountRoutes);
// app.use('/api/auth/income', incomeRoutes);
// app.use('/api/auth/transfer', transferRoute);
app.get('/', (req, res) => {
    res.send('Root route working');
});
// Serve static files...
// app.use(express.static(frontendBuildPath));
// Catch-all route...
// app.get('*', ...);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
