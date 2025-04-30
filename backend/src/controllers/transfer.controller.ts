import { Request, Response, NextFunction } from "express";
import { Transfer, Account, Transaction } from "../models/associationblock";
import { updateAccountBalance } from "../utils/updateAccountUtils";
import { TransactionType } from "../types/transactions.types";


export const createTransfer = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userID = req.userID;
    const { senderID, recipientID, amount, date } = req.body;

    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: user id not found" })
        }

        const account = await Account.findOne({ where: { userID: userID } });

        if (!account) {
            return res.status(404).json({ message: "No account found." })
        }

        const transaction = await Transaction.create({
            accountID: account?.accountID,
            transactionType: TransactionType.TRANSFER,
            amount: amount,
            date: date,
        })

        const transfer = await Transfer.create({
            amount: amount,
            senderID: senderID,
            recipientID: recipientID,
            transactionID: transaction.transactionID
        })

        const sender = await Account.findOne({where: {userID: userID}});
        const reciever = await Account.findOne({where: {userID: recipientID}});

        if(!sender) {
            return res.status(404).json({message: "Sender account not found."})
        }

        if(!reciever) {
            return res.status(404).json({message: "Reciever account not found."})
        }

        const senderNewBalance = sender?.balance - transfer.amount;
        const recieverNewBalance = reciever?.balance + transfer.amount;

        const newSenderAccBalance = await updateAccountBalance(sender.accountID, senderNewBalance);
        const newRecieverAccBalance = await updateAccountBalance(reciever.accountID, recieverNewBalance);
        return res.status(201).json({message: "transfer successful", newSenderAccBalance, newRecieverAccBalance})
    } catch (err) {
        return res.status(400).json({ message: "could not create transaction" })
    }
}

