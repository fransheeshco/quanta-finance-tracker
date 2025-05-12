"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSavingModel = void 0;
const sequelize_1 = require("sequelize");
class Saving extends sequelize_1.Model {
}
const initSavingModel = (sequelize) => {
    Saving.init({
        savingID: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        accountID: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Accounts',
                key: 'accountID',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        goalAmount: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: false,
        },
        currentAmount: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'Savings',
        timestamps: true, // Sequelize will manage 'createdAt' and 'updatedAt' automatically
    });
    return Saving;
};
exports.initSavingModel = initSavingModel;
