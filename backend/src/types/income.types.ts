import { Optional } from "sequelize";

export interface IncomeAttributes {
    incomeID: number;
    userID: number;
    transactionID: number;
    amount: number;
    date: Date;
    createdAt?: Date;
} 

export interface IncomeCreationAttributes extends Optional<IncomeAttributes, 'incomeID' | 'createdAt'> {}