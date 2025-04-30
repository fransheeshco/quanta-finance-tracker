import { Request, Response } from "express";
import { User, Expense, Transaction, Saving, Budget } from "../models/associationblock";

const getUserInfo = async (req: Request, res: Response): Promise<any> => {
    const userID = req.userID;

    try {
        const user = await User.findByPk(userID);
        const userExpenses = await Expense.findAll({where: {userID: userID}});
        const userTransactions = await Transaction.findAll({where: {userID: userID}});
        const userSavings = await Saving.findAll({where: {userID: userID}});
        const userBudgets = await Budget.findAll({where: {userID: userID}});

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        if (!userExpenses) {
            return res.status(404).json({ message: "No expenses found." });
        }
        if (!userBudgets) {
            return res.status(404).json({ message: "No budgets found." });
        }
        if (!userSavings) {
            return res.status(404).json({ message: "No savings found." });
        }
        if (!userTransactions) {
            return res.status(404).json({ message: "No transactions found." });
        }
        res.status(200).json({user, userBudgets, userExpenses, userSavings, userTransactions});
    } catch (err) {
        console.error("Error fetching user:", err); // Log the error to the console
        return res.status(500).json({ message: "Server error." });
    }
};



export { getUserInfo }