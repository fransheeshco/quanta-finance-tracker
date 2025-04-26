import { NextFunction, Request, Response } from "express";
import { Expense, Transaction, Category } from "../models/associationblock";
import { TransactionType } from "../types/transactions.types";

export const createExpense = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userID = req.userID;
    const { categoryID, title, amount, date } = req.body;

    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." })
        }
        const transaction = await Transaction.create({
            userID: userID,
            transactionType: TransactionType.EXPENSE,
            amount: amount,
            date: date,
        })
        let category = await Category.findOne({where: {userID: userID, categoryID: categoryID}});
        if(!category) {
            return res.status(404).json({message: "No category found."});
        }
        const expense = await Expense.create({
            userID, categoryID: categoryID, transactionID: transaction.transactionID, title: title, amount: amount, date: date
        })
        return res.status(201).json({ message: "Expense successfully created.", expense });
    } catch (err) {
        return res.status(403).json({ message: "Could not create transaction." })
    }
}

export const updateExpense = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userID = req.userID;
    const { expenseID, title, amount, date } = req.body;

    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." })
        }
        const expense = await Expense.findByPk(expenseID);
        await expense?.update({
            title: title, amount: amount, date: date
        })
        return res.status(201).json({ message: "Expense updated successfully.", expense });
    } catch (err) {
        return res.status(500).json({ message: "Could not update expense." })
    }
}

export const deleteExpense = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userID = req.userID;
    const { expenseID } = req.body;

    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." })
        }
        const expense = await Expense.findByPk(expenseID);
        await expense?.destroy();
    } catch (err) {
        return res.status(500).json({ message: "could not delete expenses." });
    }
}

export const getExpense = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userID = req.userID;
    
    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." })
        }
        const expenses = await Expense.findAll({where: {userID: userID}});
        if(!expenses) {
            return res.status(404).json({ message: "No expenses found." });
        }
        return res.status(200).json({message: "Expenses found:", expenses});
    } catch (err) {
        return res.status(500).json({ message: "could not get expenses." });
    }
}

export const getExpenseByCategory = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userID = req.userID;
    const { categoryID } = req.body;
    
    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." })
        }
        const expenses = await Expense.findAll({where: {categoryID: categoryID}});
        if(!expenses) {
            return res.status(404).json({ message: "No expenses found." });
        }
        return res.status(200).json({message: "Expenses found:", expenses});
    } catch (err) {
        return res.status(500).json({ message: "could not get expenses." });
    }
}

