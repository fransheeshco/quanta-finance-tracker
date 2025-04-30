import { Sequelize, DataTypes, Model } from 'sequelize';
import { TransactionAttributes, TransactionCreationAttributes, TransactionType } from '../types/transactions.types';
import sequelize from '../config/db';

class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> implements TransactionAttributes {
  public transactionID!: number;
  public userID!: number;
  public transactionType!: TransactionType;
  public amount!: number;
  public date!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initTransactionModel = (sequelize: Sequelize) => {
  Transaction.init(
    {
      transactionID: {
        type: DataTypes.INTEGER, // Use INTEGER, not NUMBER
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userID: {
        type: DataTypes.INTEGER, // Use INTEGER for userID
        allowNull: false,
        references: {
          model: 'Users', 
          key: 'userID',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      transactionType: {
        type: DataTypes.ENUM('income', 'expense', 'transfer'),
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT, 
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'Transactions', 
      timestamps: true, 
    }
  );
  return Transaction;
};
