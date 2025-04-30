import { Optional } from "sequelize";

export interface TransferAttributes {
    transferID: number;
    amount: number;
    transactionID: number;
    senderID: number;
    recipientID: number;
    createdAt?: Date;
}

export interface TransferCreationAttributes extends Optional<TransferAttributes, 'transferID'> {}