"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes")); // Comment out this line
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const budget_routes_1 = __importDefault(require("./routes/budget.routes"));
const transactions_routes_1 = __importDefault(require("./routes/transactions.routes"));
const savings_routes_1 = __importDefault(require("./routes/savings.routes"));
const expenses_routes_1 = __importDefault(require("./routes/expenses.routes"));
const account_routes_1 = __importDefault(require("./routes/account.routes"));
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
app.use('/api', auth_routes_1.default); // Ensure this line is commented out
app.use('/api/user', user_routes_1.default);
app.use('/api/category', category_routes_1.default);
app.use('/api/budgets', budget_routes_1.default);
app.use('/api/transaction', transactions_routes_1.default);
app.use('/api/savings', savings_routes_1.default);
app.use('/api/expenses', expenses_routes_1.default);
app.use('/api/account', account_routes_1.default);
app.use('/api/income', income_routes_1.default);
app.use('/api/transfer', transfer_routes_1.default);
// Serve static files from your frontend build directory
const frontendBuildPath = path_1.default.join(__dirname, '../../client/dist');
app.use(express_1.default.static(frontendBuildPath));
app.get('/*\w', (req, res) => {
    res.sendFile(path_1.default.join(frontendBuildPath, 'index.html'));
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
