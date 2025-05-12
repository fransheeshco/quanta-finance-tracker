"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initTransferModel = void 0;
const sequelize_1 = require("sequelize");
class Transfer extends sequelize_1.Model {
}
const initTransferModel = (sequelize) => {
    Transfer.init({
        transferID: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        amount: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: false,
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
        senderID: {
            type: sequelize_1.DataTypes.INTEGER,
            references: {
                model: "Accounts",
                key: "accountID"
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        recipientID: {
            type: sequelize_1.DataTypes.INTEGER,
            references: {
                model: "Accounts",
                key: "accountID"
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    }, {
        sequelize,
        tableName: 'Transfers',
        timestamps: true,
    });
    return Transfer;
};
exports.initTransferModel = initTransferModel;
