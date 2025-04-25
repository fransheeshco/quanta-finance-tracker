import { NextFunction, Request, Response } from "express";
import { Transaction } from "../models/associationblock";

export const createTransaction = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userID = req.userID;
    const { transactionType, amount, date } = req.body;

    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." });
        }
        const transaction = await Transaction.create({
            userID: userID,
            transactionType: transactionType,
            amount: amount,
            date: date,
        })
        return res.status(201).json({ message: "Transaction created successfully.", transaction });
    } catch (err) {
        return res.status(403).json({ message: "Could not create transaction." })
    }
}

export const updateTransaction = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userID = req.userID;
    const { transactionID, transactionType, amount, date } = req.body;

    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." });
        }
        const transaction = await Transaction.findByPk(transactionID);
        await transaction?.update({
            userID: userID,
            transactionType: transactionType,
            amount: amount,
            date: date,
        })
        return res.status(200).json({ message: "Transaction update successfuly.", transaction });
    } catch (err) {
        return res.status(500).json({ message: "could not upodate transaction." });
    }
}

export const deleteTransaction = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userID = req.userID;
    const {transactionID} = req.body;

    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." });
        }
        const transaction = await Transaction.findByPk(transactionID);
        await transaction?.destroy();
        return res.status(204).json({ message: "Transaction deleted successfully." }); 
    } catch (err) {
        return res.status(401).json({ message: "could not delete transaction." });
    }
}

export const getTransactions = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userID = req.userID;
    
    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." });
        }
        const transactions = await Transaction.findAll({where: {userID: userID}});
        if(!transactions) {
            return res.status(404).json({ message: "No transactions found." });
        }
        return res.status(200).json({message: "Transactions found:", transactions});
    } catch (err) {
        return res.status(401).json({ message: "could not retrieve categories" });
    }
}