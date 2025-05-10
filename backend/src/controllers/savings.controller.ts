import { Account, Saving } from "../models/associationblock";
import { Request, Response, NextFunction } from "express";
import { buildQueryOptions } from '../utils/sortingAndFilterUtils';

export const createSavings = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userID = req.userID;
    const { title, goalAmount, currentAmount } = req.body;

    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." });
        }
        const account = await Account.findOne({ where: { userID: userID } });
        if (!account) {
            return res.status(404).json({ message: "Account not found." });
        }
        const savings = await Saving.create({
            accountID: account.accountID, title: title, goalAmount: goalAmount, currentAmount: currentAmount
        })
        return res.status(200).json({ message: "Savings successfully created.", savings });
    } catch (err) {
        return res.status(403).json({ message: "Could not create transaction." })
    }
}

export const updateSavings = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userID = req.userID;
    const { id: savingID } = req.params;
    const { title, goalAmount, currentAmount } = req.body;

    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." });
        }
        const savings = await Saving.findByPk(savingID);
        await savings?.update({
            title: title, goalAmount: goalAmount, currentAmount: currentAmount
        })
        return res.status(201).json({ message: "Savings updated successfully.", savings });
    } catch (err) {
        return res.status(500).json({ message: "could not upodate savings." });
    }
}

export const deleteSavings = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userID = req.userID;
    const { id: savingID } = req.params;

    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." });
        }
        const savings = await Saving.findByPk(savingID);
        if (!savings) {
            return res.status(401).json({ message: "No savings found" })
        }
        await savings?.destroy();
        return res.status(204).json({ message: "Transaction deleted successfully." });
    } catch (err) {
        return res.status(500).json({ message: "could not upodate savings." });
    }
}

export const getSavings = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userID = req.userID;

    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." });
        }

        const account = await Account.findOne({ where: { userID } });
        if (!account) {
            return res.status(404).json({ message: "Account not found." });
        }

        const page = Number(req.query.page) || 1;
        const limit = 5;
        const offset = (page - 1) * limit;

        const filters = {
            title: req.query.title
        };

        const sortField = (req.query.sortField as string) || 'createdAt';
        const sortDirection = req.query.sortBy === 'asc' || req.query.sortBy === 'desc' ? req.query.sortBy : 'asc';

        const sort: Record<string, 'asc' | 'desc'> = {
            title: sortDirection,
        };



        const { where, order } = buildQueryOptions({ filters, sort });
        where.accountID = account.accountID;

        const savings = await Saving.findAll({
            where,
            order,
            limit,
            offset
        });

        return res.status(200).json({ message: "Savings found", savings });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Could not retrieve savings.", err });
    }
};
