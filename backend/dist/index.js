"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const income_routes_1 = __importDefault(require("./routes/income.routes"));
const transfer_routes_1 = __importDefault(require("./routes/transfer.routes"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// API Routes
// app.use('/api', authRoutes); // Ensure this line is commented out
//app.use('/api/user', userRoutes) ;
//app.use('/api/category', categoryRoutes);
//app.use('/api/budgets', budgetRoutes);
//app.use('/api/transaction', transactionRoutes);
//app.use('/api/savings', savingsRoutes);
//app.use('/api/expenses', expensesRoutes);
//app.use('/api/account', accountRoutes);
app.use('/api/income', income_routes_1.default);
app.use('/api/transfer', transfer_routes_1.default);
app.get('/', (req, res) => {
    res.send('Root route working');
});
// Serve static files from your frontend build directory
const frontendBuildPath = path_1.default.join(__dirname, '../../client/build');
app.use(express_1.default.static(frontendBuildPath));
// Define a catch-all route to serve the frontend's index.html for all other requests
//app.get('*', (req: Request, res: Response) => {
//res.sendFile(path.join(frontendBuildPath, 'index.html'));
//});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
