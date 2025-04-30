import { DataTypes, Sequelize, Model } from "sequelize"
import { TransferAttributes, TransferCreationAttributes } from "../types/transfer.types"

class Transfer extends Model<TransferAttributes, TransferCreationAttributes> implements TransferAttributes {
    public transferID!: number;
    public amount!: number;
    public transactionID!: number;
    public senderID!: number;
    public recipientID!: number;
}

export const initTransferModel = (sequelize: Sequelize) => {
    Transfer.init({
        transferID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
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
        senderID: {
            type: DataTypes.INTEGER,
            references: {
                model: "Accounts",
                key: "accountID"
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        recipientID: {
            type: DataTypes.INTEGER,
            references: {
                model: "Accounts",
                key: "accountID"
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    },
        {
            sequelize,
            tableName: 'Transfers',
            timestamps: true,
        }
    )
    return Transfer
}

