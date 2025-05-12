"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initTransactionModel = void 0;
const sequelize_1 = require("sequelize");
class Transaction extends sequelize_1.Model {
}
const initTransactionModel = (sequelize) => {
    Transaction.init({
        transactionID: {
            type: sequelize_1.DataTypes.INTEGER, // Use INTEGER, not NUMBER
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        accountID: {
            type: sequelize_1.DataTypes.INTEGER, // Use INTEGER for userID
            allowNull: false,
            references: {
                model: 'Accounts',
                key: 'accountID',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        transactionType: {
            type: sequelize_1.DataTypes.ENUM('income', 'expense', 'transfer'),
            allowNull: false,
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
        tableName: 'Transactions',
        timestamps: true,
    });
    return Transaction;
};
exports.initTransactionModel = initTransactionModel;
