import { Optional } from "sequelize";

export interface AccountAttributes {
    accountID: number;
    userID: number;
    balance: number;
    createdAt?: Date;
    lastUpdated?: Date;
}

export interface AccountCreationAttributes extends Optional<AccountAttributes, 'accountID'> {}