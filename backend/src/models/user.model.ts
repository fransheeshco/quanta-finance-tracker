import { Sequelize, DataTypes, Model } from 'sequelize';
import { UserAttributes, UserCreationAttributes } from '../types/user.types';

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public userID!: number;
  public fname!: string;
  public lname!: string;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initUserModel = (sequelize: Sequelize) => {
  User.init(
    {
      userID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'Users',
      sequelize,
      timestamps: true,
    }
  );
  return User;
};
