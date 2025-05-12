"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Income = exports.Transfer = exports.Account = exports.Category = exports.Budget = exports.Expense = exports.Transaction = exports.Saving = exports.User = void 0;
const user_model_1 = require("./user.model");
const savings_model_1 = require("./savings.model");
const budget_model_1 = require("./budget.model");
const transactions_model_1 = require("./transactions.model");
const expenses_model_1 = require("./expenses.model");
const category_model_1 = require("./category.model");
const account_model_1 = require("./account.model");
const transfer_model_1 = require("./transfer.model");
const income_model_1 = require("./income.model");
const db_1 = __importDefault(require("../config/db"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Initialize models 
const User = (0, user_model_1.initUserModel)(db_1.default);
exports.User = User;
const Saving = (0, savings_model_1.initSavingModel)(db_1.default);
exports.Saving = Saving;
const Budget = (0, budget_model_1.initBudgetModel)(db_1.default);
exports.Budget = Budget;
const Transaction = (0, transactions_model_1.initTransactionModel)(db_1.default);
exports.Transaction = Transaction;
const Expense = (0, expenses_model_1.initExpenseModel)(db_1.default);
exports.Expense = Expense;
const Category = (0, category_model_1.initCategoryModel)(db_1.default);
exports.Category = Category;
const Account = (0, account_model_1.initAccountModel)(db_1.default);
exports.Account = Account;
const Transfer = (0, transfer_model_1.initTransferModel)(db_1.default);
exports.Transfer = Transfer;
const Income = (0, income_model_1.initIncomeModel)(db_1.default);
exports.Income = Income;
// account and Savings relations
Account.hasMany(Saving, { foreignKey: 'accountID' });
Saving.belongsTo(Account, { foreignKey: 'accountID' });
// account and budget relations
Account.hasMany(Budget, { foreignKey: 'accountID' });
Budget.belongsTo(Account, { foreignKey: 'accountID' });
// account and transactions relations
Account.hasMany(Transaction, { foreignKey: 'accountID' });
Transaction.belongsTo(Account, { foreignKey: 'accountID' });
// account and Expense relations
Account.hasMany(Expense, { foreignKey: 'accountID' });
Expense.belongsTo(Account, { foreignKey: 'accountID' });
// Category and expenses relations
Category.hasMany(Expense, { foreignKey: "categoryID" });
Expense.belongsTo(Category, { foreignKey: "categoryID" });
// expense and transaction relation
Transaction.hasMany(Expense, { foreignKey: "transactionID" });
Expense.belongsTo(Transaction, { foreignKey: "transactionID" });
// transer and transaction relation
Transaction.hasMany(Transfer, { foreignKey: "transactionID" });
Transfer.belongsTo(Transaction, { foreignKey: "transactionID" });
Transaction.hasMany(Income, { foreignKey: "transactionID" });
Income.belongsTo(Transaction, { foreignKey: "transactionID" });
// account and user relation
User.hasOne(Account, { foreignKey: "userID" });
Account.belongsTo(User, { foreignKey: "userID" });
// Sync the models with the database
db_1.default.sync({ force: false })
    .then(() => {
    console.log('Database synced!');
})
    .catch((err) => {
    console.log('Error syncing database:', err);
});
