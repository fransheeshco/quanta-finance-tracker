import { DataTypes, Sequelize, Model } from 'sequelize';
import { SavingAttributes, SavingCreationAttributes } from '../types/saving.types';

class Saving extends Model<SavingAttributes, SavingCreationAttributes> implements SavingAttributes {
  public savingID!: number;
  public accountID!: number;
  public title!: string;
  public goalAmount!: number;
  public currentAmount!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initSavingModel = (sequelize: Sequelize) => {
  Saving.init(
    {
      savingID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      accountID: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        references: {
          model: 'Accounts',
          key: 'accountID',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      goalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      currentAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'Savings',
      timestamps: true,  // Sequelize will manage 'createdAt' and 'updatedAt' automatically
    }
  );

  return Saving;
};
