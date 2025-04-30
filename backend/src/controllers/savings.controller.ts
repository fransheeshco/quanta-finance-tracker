import { Account, Saving } from "../models/associationblock";
import { Request, Response, NextFunction } from "express";

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
    const { savingID, title, goalAmount, currentAmount } = req.body;

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
    const { savingID } = req.body;

    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." });
        }
        const savings = await Saving.findByPk(savingID);
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
        const account = await Account.findOne({where: {userID: userID }})
        if (!account) {
            return res.status(404).json({ message: "Account not found." });
        }
        const savings = await Saving.findAll({ where: { accountID: account?.accountID } });
        if (!savings) {
            return res.status(404).json({ message: "No savings found." });
        }
        return res.status(200).json({ message: "Transaction found.", savings });
    } catch (err) {
        return res.status(401).json({ message: "could not retrieve categories" });
    }
}