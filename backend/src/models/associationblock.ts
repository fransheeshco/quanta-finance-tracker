import { initUserModel } from "./user.model";
import { initSavingModel } from "./savings.model";
import { initBudgetModel } from "./budget.model";
import { initTransactionModel } from "./transactions.model";
import { initExpenseModel } from "./expenses.model";
import { initCategoryModel } from "./category.model";
import sequelize from "../config/db";
import dotenv from "dotenv";

dotenv.config();

// Initialize models using factory functions
const User = initUserModel(sequelize);
const Saving = initSavingModel(sequelize);
const Budget = initBudgetModel(sequelize);
const Transaction = initTransactionModel(sequelize);
const Expense = initExpenseModel(sequelize);
const Category = initCategoryModel(sequelize);

// User and Savings relations
User.hasMany(Saving, { foreignKey: 'userID' });
Saving.belongsTo(User, { foreignKey: 'userID' });

// User and budget relations
User.hasMany(Budget, { foreignKey: 'userID' });
Budget.belongsTo(User, { foreignKey: 'userID' });

// user and transactions relations
User.hasMany(Transaction, { foreignKey: 'userID' });
Transaction.belongsTo(User);

// user and Expense relations
User.hasMany(Expense, { foreignKey: 'userID' });
Expense.belongsTo(User, { foreignKey: 'userID' });

// Category and expenses relations
Category.hasMany(Expense, { foreignKey: "categoryID" });
Expense.belongsTo(Category, { foreignKey: "categoryID" });

// expense and transaction relation
Transaction.hasMany(Expense, { foreignKey: "transactionID" });
Expense.belongsTo(Transaction, { foreignKey: "transactionID" });

// Sync the models with the database
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced!');
  })
  .catch((err) => {
    console.log('Error syncing database:', err);
  });



export { User, Saving, Transaction, Expense, Budget, Category };