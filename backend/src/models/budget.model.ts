import { Sequelize, DataTypes, Model } from "sequelize";
import { BudgetAttributes, BudgetCreationAttributes } from "../types/budget.types";

class Budget extends Model<BudgetAttributes, BudgetCreationAttributes> implements BudgetAttributes {
    public budgetID!: number;
    public accountID!: number;
    public budgetName!: string;
    public amount!: number;
    public readonly startDate!: Date;
    public readonly endDate!: Date;
}

export const initBudgetModel = (sequelize: Sequelize) => {
    Budget.init({
        budgetID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
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
        budgetName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        startDate: {
            type: DataTypes.DATE
        },
        endDate: {
            type: DataTypes.DATE
        }
    }, {
        sequelize,
        tableName: 'Budgets',
        timestamps: true,  
    }

    )
    return Budget;
}
