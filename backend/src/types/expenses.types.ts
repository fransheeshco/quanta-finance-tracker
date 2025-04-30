import { Optional } from "sequelize";

export interface ExpensesAttributes {
    expenseID: number;
    accountID: number;
    categoryID: number;
    transactionID: number;
    title: string;
    amount: number;
    date: Date;
}

export interface ExpensesCreationAttributes extends Optional<ExpensesAttributes, 'expenseID'> {}