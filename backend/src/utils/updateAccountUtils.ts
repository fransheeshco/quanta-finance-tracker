import { Account } from "../models/associationblock"
import {response, Response} from "express";

export const updateAccountBalance = async (accountID: number, newBalance: number) => { 
    const account = await Account.findByPk(accountID);
    if(!account) {
        throw new Error("Account not found.");
    } 
    await account.update({
        balance: newBalance
    })
    return account.balance;
}