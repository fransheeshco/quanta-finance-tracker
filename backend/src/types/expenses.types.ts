import { Optional } from "sequelize";

export interface ExpensesAttributes {
    expenseID: number;
    userID: number;
    categoryID: number;
    title: string;
    amount: number;
    date: Date;
}

export interface ExpensesCreationAttributes extends Optional<ExpensesAttributes, 'expenseID'> {}