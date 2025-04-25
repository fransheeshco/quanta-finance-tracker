import { Request, Response, NextFunction } from "express";
import { Budget } from "../models/associationblock";

export const createBudget = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userID = req.userID;
    const { budgetName, amount, startDate, endDate } = req.body

    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." });
        }
        const budget = await Budget.create({
            userID, budgetName, amount, startDate, endDate
        });
        return res.status(201).json({ message: "Budget created successfully.", budget });
    } catch (err) {
        return res.status(403).json({ message: "Could not create budget." })
    }
}

export const updateBudget = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userID = req.userID;
    const { budgetID, budgetName, amount, startDate, endDate } = req.body;

    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." });
        }
        const budget = await Budget.findByPk(budgetID);
        await budget?.update({
            budgetName: budgetName,
            amount: amount,
            startDate: startDate,
            endDate: endDate
        })
        return res.status(200).json({ message: "Budget update successfuly.", budget });
    } catch (err) {
        return res.status(500).json({ message: "Could not update category." });
    }
}

export const deleteBudget = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userID = req.userID;
    const { budgetID } = req.body;

    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." });
        }
        const budget = await Budget.findByPk(budgetID);
        if (!budget) {
            return res.status(404).json({ message: "Budget not found." });
        }
        await budget?.destroy();
        return res.status(204).json({ message: "Budget deleted successfully." });
    } catch (err) {
        return res.status(401).json({ message: "could not delete budget." });
    }
}

export const getBudgets = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userID = req.userID;
    
    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." });
        }
        const budgets = await Budget.findAll({where: {userID: userID}})
        if(!budgets) {
            return res.status(404).json({ message: "No budgets found." });
        }
        return res.status(200).json({message: "Budgets found:", budgets});
    } catch (err) {
        return res.status(401).json({ message: "could not retrieve categories" });
    }
}