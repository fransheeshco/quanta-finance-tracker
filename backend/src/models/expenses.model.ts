import { DataTypes, Sequelize, Model, ENUM, DATE } from "sequelize";
import { ExpensesAttributes, ExpensesCreationAttributes } from "../types/expenses.types";

class Expense extends Model<ExpensesAttributes, ExpensesCreationAttributes> implements ExpensesAttributes {
    public expenseID!: number;
    public accountID!: number;
    public categoryID!: number;
    public transactionID!: number;
    public title!: string;
    public amount!: number;
    public date!: Date;
}

export const initExpenseModel = (sequelize: Sequelize) => {
    Expense.init({
        expenseID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
        categoryID: {
            type: DataTypes.INTEGER,
            references: {
                model: "Categories",
                key: "categoryID"
            }
        },
        transactionID: {
            type: DataTypes.INTEGER,
            references: {
                model: "Transactions",
                key: "transactionID",
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
        }
    }, 
    {
        sequelize,
        tableName: 'Expeneses',
        timestamps: true,  
      }
    )
    return Expense;
}
