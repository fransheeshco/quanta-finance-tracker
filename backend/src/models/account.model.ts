import { DataTypes, Model, Sequelize } from "sequelize";
import { AccountAttributes, AccountCreationAttributes } from "../types/account.types";

class Account extends Model<AccountAttributes, AccountCreationAttributes> implements AccountAttributes {
    public accountID!: number;
    public userID!: number;
    public balance!: number;
    public accountType!: string;
    public readonly createdAt!: Date;
    public readonly lastUpdated!: Date;
}

export const initAccountModel = (sequelize: Sequelize) => {
    Account.init({
        accountID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        accountType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        balance: {
            type: DataTypes.FLOAT,
        },
        userID: {
            type: DataTypes.INTEGER,
            references: {
                model: "Users",
                key: "userID"
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            allowNull: false,
        },
    },
        {
            sequelize,
            tableName: "Accounts",
            timestamps: true,
        }
    )
    return Account;
}
