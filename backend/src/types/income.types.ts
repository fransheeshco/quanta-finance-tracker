import { Optional } from "sequelize";

export interface IncomeAttributes {
    incomeID: number;
    accountID: number;
    transactionID: number;
    amount: number;
    date: Date;
    createdAt?: Date;
} 

export interface IncomeCreationAttributes extends Optional<IncomeAttributes, 'incomeID' | 'createdAt'> {}