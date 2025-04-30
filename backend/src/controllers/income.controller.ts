import { Account, Income, Transaction } from "../models/associationblock";
import { Request, Response, NextFunction } from "express";
import { TransactionType } from "../types/transactions.types";

export const addIncome = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userID = req.userID;
    const { amount, date } = req.body;

    try {
        if(!userID) {
            return res.status(401).json({message: "Unauthorized: no user id."})
        }
        const account = await Account.findOne({where: {userID: userID}})
        if(!account) {
            return res.status(404).json({message: "No account found"});
        }
        const transaction = await Transaction.create({
            accountID: account?.accountID,
            transactionType: TransactionType.INCOME,
            amount: amount,
            date: date,
        })
        const income = await Income.create({
            accountID: account?.accountID,
            amount: amount,
            date: date,
            transactionID: transaction.transactionID
        })
        return res.status(201).json({message: "Income added successfully.", income});
    } catch (err) {
        return res.status(403).json({ message: "Could not create income." })
    }
} 

export const deleteIncome = async  (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userID = req.userID;
    const { incomeID } = req.body;

    try {
        if(!userID) {
            return res.status(401).json({message: "Unauthorized: no user id."})
        }
        const account = await Account.findOne({where: {userID: userID}})
        if(!account) {
            return res.status(404).json({message: "No account found"});
        }
        const income = await Income.findByPk(incomeID);
        if(income?.accountID !== account.accountID) {
            return res.status(401).json({message: "not your income to delete"})
        }
        await income?.destroy();
        return res.status(204).json({ message: "income deleted successfully." });
    } catch (err) {
        return res.status(500).json({ message: "could not delete income." });
    }
}