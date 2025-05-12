"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initBudgetModel = void 0;
const sequelize_1 = require("sequelize");
class Budget extends sequelize_1.Model {
}
const initBudgetModel = (sequelize) => {
    Budget.init({
        budgetID: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
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
        budgetName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: false,
        },
        startDate: {
            type: sequelize_1.DataTypes.DATE
        },
        endDate: {
            type: sequelize_1.DataTypes.DATE
        }
    }, {
        sequelize,
        tableName: 'Budgets',
        timestamps: true,
    });
    return Budget;
};
exports.initBudgetModel = initBudgetModel;
