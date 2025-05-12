"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// API Routes
// app.use('/api/auth', authRoutes); // Ensure this line is commented out
// app.use('/api/auth/user', userRoutes) ;
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
// Serve static files from your frontend build directory
//const frontendBuildPath = path.join(__dirname, '../../frontend/build'); // Adjust the path as needed
// app.use(express.static(frontendBuildPath));
// Define a catch-all route to serve the frontend's index.html for all other requests
// app.get('*', (req: Request, res: Response) => {
//  res.sendFile(path.join(frontendBuildPath, 'index.html'));
// });
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
