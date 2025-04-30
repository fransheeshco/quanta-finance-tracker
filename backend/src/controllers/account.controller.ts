import { Request, Response, NextFunction } from "express";
import { updateAccountBalance } from "../utils/updateAccountUtils";
import { Account } from "../models/associationblock";

export const addAccount = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userID = req.userID;
    const { balance } = req.body;

    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." });
        }
        const findAcc = await Account.findOne({ where: { userID: userID } });
        if (findAcc) {
            return res.status(403).json({ message: "Account already exists. Could not create account." })
        }
        const account = await Account.create({
            userID: userID,
            balance: balance,
        })
        return res.status(201).json({ message: "Account created successfully.", account })
    } catch (err) {
        return res.status(403).json({ message: "Could not create account." })
    }
}

export const deleteAccount = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userID = req.userID;
    const { accountID } = req.body;

    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." });
        }
        const account = await Account.findByPk(accountID);
        if (!account) {
            return res.status(404).json({ message: "Could not find account." });
        }
        await account.destroy();
        return res.status(204).json({ message: "account deleted successfully." });
    } catch (err) {
        return res.status(500).json({ message: "could not upodate savings." });
    }
}

export const updateAccount = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userID = req.userID;
    const { balance, accountID } = req.body;

    try {
        if(!userID) {
            return res.status(401).json({message: "Unauthorized: user id not found."})
        }

        const account = await Account.findByPk(accountID);
        if (!accountID) {
            return res.status(401).json({message: "Account not found."})
        }

        const updatedAcc = await updateAccountBalance(accountID, balance);
        return res.status(201).json({message: "account updated successfully", updatedAcc});
    } catch (err) {
        return res.status(400).json({message: "error: could not update account"})
    }
}