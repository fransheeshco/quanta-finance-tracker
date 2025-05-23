import { Optional } from "sequelize";

export interface BudgetAttributes {
    budgetID: number;
    accountID: number;
    budgetName: string;
    amount: number;
    startDate: Date;
    endDate: Date;
}

export interface BudgetCreationAttributes extends Optional<BudgetAttributes, 'budgetID'> {}