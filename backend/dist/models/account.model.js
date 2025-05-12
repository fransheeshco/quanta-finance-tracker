"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAccountModel = void 0;
const sequelize_1 = require("sequelize");
class Account extends sequelize_1.Model {
}
const initAccountModel = (sequelize) => {
    Account.init({
        accountID: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        accountType: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        balance: {
            type: sequelize_1.DataTypes.FLOAT,
        },
        userID: {
            type: sequelize_1.DataTypes.INTEGER,
            references: {
                model: "Users",
                key: "userID"
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: "Accounts",
        timestamps: true,
    });
    return Account;
};
exports.initAccountModel = initAccountModel;
