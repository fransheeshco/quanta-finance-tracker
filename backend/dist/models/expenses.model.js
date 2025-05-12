"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initExpenseModel = void 0;
const sequelize_1 = require("sequelize");
class Expense extends sequelize_1.Model {
}
const initExpenseModel = (sequelize) => {
    Expense.init({
        expenseID: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        accountID: {
            type: sequelize_1.DataTypes.INTEGER,
            references: {
                model: "Accounts",
                key: "accountID"
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        categoryID: {
            type: sequelize_1.DataTypes.INTEGER,
            references: {
                model: "Categories",
                key: "categoryID"
            }
        },
        transactionID: {
            type: sequelize_1.DataTypes.INTEGER,
            references: {
                model: "Transactions",
                key: "transactionID",
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        amount: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: false
        },
        date: {
            type: sequelize_1.DataTypes.DATE,
        }
    }, {
        sequelize,
        tableName: 'Expeneses',
        timestamps: true,
    });
    return Expense;
};
exports.initExpenseModel = initExpenseModel;
