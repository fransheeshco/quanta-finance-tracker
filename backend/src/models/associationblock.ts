import { initUserModel } from "./user.model";
import { initSavingModel } from "./savings.model";
import { initBudgetModel } from "./budget.model";
import { initTransactionModel } from "./transactions.model";
import { initExpenseModel } from "./expenses.model";
import { initCategoryModel } from "./category.model";
import { initAccountModel } from "./account.model";
import { initTransferModel } from "./transfer.model";
import { initIncomeModel } from "./income.model";
import sequelize from "../config/db";
import dotenv from "dotenv";

dotenv.config();

// Initialize models 
const User = initUserModel(sequelize);
const Saving = initSavingModel(sequelize);
const Budget = initBudgetModel(sequelize);
const Transaction = initTransactionModel(sequelize);
const Expense = initExpenseModel(sequelize);
const Category = initCategoryModel(sequelize);
const Account = initAccountModel(sequelize);
const Transfer = initTransferModel(sequelize);
const Income = initIncomeModel(sequelize);

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
User.hasOne(Account, { foreignKey: "userID"});
Account.belongsTo(User, { foreignKey: "userID"});

// Sync the models with the database
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced!');
  })
  .catch((err) => {
    console.log('Error syncing database:', err);
  });



export { User, Saving, Transaction, Expense, Budget, Category, Account, Transfer, Income };