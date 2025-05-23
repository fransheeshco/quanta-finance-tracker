import { DataTypes, Sequelize, Model } from "sequelize";
import { IncomeAttributes, IncomeCreationAttributes } from "../types/income.types";

class Income extends Model<IncomeAttributes, IncomeCreationAttributes> implements IncomeAttributes {
    public incomeID!: number;
    public accountID!: number;
    public transactionID!: number;
    public amount!: number;
    public date!: Date;
}

export const initIncomeModel = (sequelize: Sequelize) => {
    Income.init({
        incomeID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true, 
            allowNull: false,
        }, 
        accountID: {
            type: DataTypes.INTEGER,
            references: {
                model: "Accounts",
                key: "accountID"
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        transactionID: {
            type: DataTypes.INTEGER,
            references: {
                model: "Transactions",
                key: "transactionID"
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: "Incomes",
        timestamps: true,
    })
    return Income;
}