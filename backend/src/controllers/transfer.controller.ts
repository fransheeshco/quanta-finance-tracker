import { Request, Response, NextFunction } from "express";
import { Transfer, Account, Transaction } from "../models/associationblock";
import { updateAccountBalance } from "../utils/updateAccountUtils";
import { TransactionType } from "../types/transactions.types";


export const createTransfer = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userID = req.userID;
    const { senderID, recipientID, amount, date } = req.body;

    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: user ID not found." });
        }

        const account = await Account.findOne({ where: { userID } });
        if (!account) {
            return res.status(404).json({ message: "No account found." });
        }

        // 🔒 Ensure the sender is the logged-in user's account
        if (account.accountID !== senderID) {
            return res.status(403).json({ message: "You are not authorized to transfer from this account." });
        }

        const sender = await Account.findOne({ where: { accountID: senderID } });
        const receiver = await Account.findOne({ where: { accountID: recipientID } });

        if (!sender || !receiver) {
            return res.status(404).json({ message: "Sender or recipient account not found." });
        }

        // ❗ Check sender has enough balance
        if (sender.balance < amount) {
            return res.status(400).json({ message: "Insufficient balance for transfer." });
        }

        const transaction = await Transaction.create({
            accountID: account.accountID,
            transactionType: TransactionType.TRANSFER,
            amount,
            date,
        });

        const transfer = await Transfer.create({
            amount,
            senderID,
            recipientID,
            transactionID: transaction.transactionID,
        });

        // 💸 Update balances
        const senderNewBalance = sender.balance - amount;
        const receiverNewBalance = receiver.balance + amount;

        const newSenderAccBalance = await updateAccountBalance(sender.accountID, senderNewBalance);
        const newReceiverAccBalance = await updateAccountBalance(receiver.accountID, receiverNewBalance);

        return res.status(201).json({
            message: "Transfer successful.",
            transfer,
            newSenderAccBalance,
            newReceiverAccBalance,
        });
    } catch (err) {
        return res.status(400).json({ message: "Could not create transfer transaction." });
    }
};

export const getAndSortByDate = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userID = req.userID;

    try {
        const account = await Account.findOne({where: {userID: userID}})
        if (!account) {
            return res.status(401).json({message: "User account does not exist."})
        }
        const transfers = await Transfer.findAll({where: {senderID: account.accountID }, order: [['createdAt', 'DESC']]})
        return res.status(200).json({message: "Transfers found: ", transfers})
    } catch (err) {
        return res.status(401).json({message: "Could not get Transfers"})
    }
}

