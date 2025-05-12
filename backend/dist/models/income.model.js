"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initIncomeModel = void 0;
const sequelize_1 = require("sequelize");
class Income extends sequelize_1.Model {
}
const initIncomeModel = (sequelize) => {
    Income.init({
        incomeID: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
        transactionID: {
            type: sequelize_1.DataTypes.INTEGER,
            references: {
                model: "Transactions",
                key: "transactionID"
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        amount: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: false,
        },
        date: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: "Incomes",
        timestamps: true,
    });
    return Income;
};
exports.initIncomeModel = initIncomeModel;
