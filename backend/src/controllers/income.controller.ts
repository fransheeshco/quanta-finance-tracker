import { Account, Income, Transaction } from "../models/associationblock";
import { Request, Response, NextFunction } from "express";
import { TransactionType } from "../types/transactions.types";
import { buildQueryOptions } from '../utils/sortingAndFilterUtils';

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
    const { id: incomeID } = req.body;

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

export const getIncome = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userID = req.userID;

    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: no user id." });
        }

        const account = await Account.findOne({ where: { userID } });
        if (!account) {
            return res.status(404).json({ message: "No account found" });
        }

        const page = Number(req.query.page) || 1;
        const limit = 5;
        const offset = (page - 1) * limit;

        const filters = {
            date: req.query.date,
            amount: req.query.amount
        };

        const sortField = (req.query.sortField as string) || 'createdAt';
        const sortDirection = req.query.sortBy === 'asc' || req.query.sortBy === 'desc' ? req.query.sortBy : 'desc';

        const sort: Record<string, 'asc' | 'desc'> = {
            [sortField]: sortDirection,
        };

        const { where, order } = buildQueryOptions({ filters, sort });
        where.accountID = account.accountID;

        const income = await Income.findAndCountAll({
            where,
            order,
            limit,
            offset,
        });
        return res.status(200).json({ message: "Incomes found", income });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Could not retrieve income." });
    }
};


export const updateIncome = async  (req: Request, res: Response): Promise<any> => {
    const userID = req.userID;
    const {amount} = req.body;
    const {id: incomeID} = req.params;

    try {
        if(!userID) {
            return res.status(401).json({message: "Unauthorized: no user id."})
        }
        const income = await Income.findByPk(incomeID);
        if (!income) {
            return res.status(404).json({message: "No income found"});
        }
        await income.update({amount})
        return res.status(200).json({ message: "Incomes found", income });
    } catch (err) {
        return res.status(500).json({ message: "could not delete income.", err });
    }
}