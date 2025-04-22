import { Optional } from "sequelize";

export enum TransactionType {
    INCOME = 'income',
    EXPENSE = 'expense',
    TRANSFER = 'transfer',
}  

export interface TransactionAttributes {
    transactionID: number;
    userID: number;
    transactionType: TransactionType;
    amount: number;
    date: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface TransactionCreationAttributes extends Optional<TransactionAttributes, 'transactionID'>  {}