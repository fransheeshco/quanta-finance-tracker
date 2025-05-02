import { Request, Response } from "express";
import { User, Expense, Transaction, Saving, Budget, Account, Income,  } from "../models/associationblock";

const getUserInfo = async (req: Request, res: Response): Promise<any> => {
    const userID = req.userID;

    try {
        const account = await Account.findOne({where: {userID: userID}});
        const expenses = await Expense.findAll({where: { accountID: account?.accountID  }});
        const transactions = await Transaction.findAll({where: {accountID: account?.accountID}});
        const savings = await Saving.findAll({where: {accountID: account?.accountID}});
        const budgets = await Budget.findAll({where: {accountID: account?.accountID}});
        const incomes = await Income.findAll({where: {accountID: account?.accountID}});

        if (!userID) {
            return res.status(404).json({ message: "User not found." });
        }
        if (!expenses) {
            return res.status(404).json({ message: "No expenses found." });
        }
        if (!budgets) {
            return res.status(404).json({ message: "No budgets found." });
        }
        if (!savings) {
            return res.status(404).json({ message: "No savings found." });
        }
        if (!transactions) {
            return res.status(404).json({ message: "No transactions found." });
        }
        if (!incomes) {
            return res.status(404).json({ message: "No income found." });
        }

        res.status(200).json({expenses, budgets, incomes, savings, transactions});
    } catch (err) {
        console.error("Error fetching user:", err);
        return res.status(500).json({ message: "Server error." });
    }
};



export { getUserInfo }