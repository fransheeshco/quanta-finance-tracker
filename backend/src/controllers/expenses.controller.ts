import { NextFunction, Request, Response } from "express";
import { Expense, Transaction, Category, Account } from "../models/associationblock";
import { TransactionType } from "../types/transactions.types";
import { buildQueryOptions } from '../utils/sortingAndFilterUtils';



export const createExpense = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userID = req.userID;
    const { categoryID, title, amount, date } = req.body;

    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." })
        }
        const account = await Account.findOne({where:  {userID: userID}});
        if (!account) {
            return res.status(404).json({message: "Account not found"})
        }
        const transaction = await Transaction.create({
            accountID: account.accountID,
            transactionType: TransactionType.EXPENSE,
            amount: amount,
            date: date,
        })
        const category = await Category.findOne({
            where: { accountID: account.accountID, categoryID: categoryID },
        });
        
        if(!category) {
            return res.status(404).json({message: "No category found."});
        }
        const expense = await Expense.create({
            accountID: account.accountID, categoryID: categoryID, transactionID: transaction.transactionID, title: title, amount: amount, date: date
        })
        return res.status(201).json({ message: "Expense successfully created.", expense });
    } catch (err) {
        return res.status(403).json({ message: "Could not create transaction." })
    }
}

export const updateExpense = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userID = req.userID;
    const {id : expenseID} = req.params;
    const { title, amount, date } = req.body;

    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." })
        }
        const expense = await Expense.findByPk(expenseID);
        console.log('Retrieved Expense:', expense); 
        console.log('User ID:', userID);
        console.log('Expense ID:', expenseID);
        if (!expense) {
            return res.status(401).json({message: "expense not found"});
        }
        await expense?.update({
            title, amount, date
        })
        return res.status(201).json({ message: "Expense updated successfully.", expense });
    } catch (err) {
        return res.status(500).json({ message: "Could not update expense." })
    }
}

export const deleteExpense = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userID = req.userID;
    const {id : expenseID} = req.params;

    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." })
        }
        const account = await Account.findOne({where:  {userID: userID}});
        if (!account) {
            return res.status(404).json({message: "Account not found"})
        }
        const expense = await Expense.findByPk(expenseID);
        if(expense?.accountID !== account.accountID) {
            return res.status(403).json({ message: "Not your expense to delete." });
        }
        await expense?.destroy();
    } catch (err) {
        return res.status(500).json({ message: "could not delete expenses." });
    }
}

export const getExpense = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userID = req.userID;

    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." });
        }

        const account = await Account.findOne({ where: { userID } });

        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        // Pagination setup
        const page = Number(req.query.page) || 1;
        const limit = 5;
        const offset = (page - 1) * limit;

        // Build filters using query params
        const filters = {
            title: req.query.title,
            categoryID: req.query.categoryID,
        };
        const sortField = (req.query.sortField as string) || 'createdAt';
        const sortDirection = req.query.sortBy === 'asc' || req.query.sortBy === 'desc' ? req.query.sortBy : 'desc';
        
        const sort: Record<string, 'asc' | 'desc'> = {
            [sortField]: sortDirection,
        };

        // Include accountID so user only sees their own data
        const { where, order } = buildQueryOptions({ filters, sort });
        where.accountID = account.accountID;

        console.log("Where:", where);  // Debugging where
        console.log("Order:", order);  // Debugging order

        const { rows, count } = await Expense.findAndCountAll({
            where,
            order,
            limit,
            offset,
            include: [
                {
                  model: Category,
                  attributes: ['categoryName'], // Only include the name
                },
              ],
            
        });

        console.log("Rows:", rows);  // Check what rows are returned
        console.log("Count:", count);  // Check the count

        if (!rows || rows.length === 0) {
            return res.status(404).json({ message: "No expenses found." });
        }

        return res.status(200).json({ 
            message: "Expenses found", 
            expenses: rows,      // renamed to match expectation
            count,               // this is your expenseCount
            page 
        });
    } catch (err) {
        console.error(err);  // Log any errors
        return res.status(500).json({ message: "Could not get expenses." });
    }
};



export const getExpenseByCategory = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userID = req.userID;
    const { categoryID } = req.body;
    
    try {
        if (!userID) {
            return res.status(401).json({ message: "Unauthorized: No user ID." })
        }
        const account = await Account.findOne({where: {userID: userID}});
        if (!account) {
            return res.status(404).json({message: "Account not found"})
        }
        const expenses = await Expense.findAll({where: {categoryID: categoryID, accountID: account.accountID }});
        if(!expenses) {
            return res.status(404).json({ message: "No expenses found." });
        }
        return res.status(200).json({message: "Expenses found:", expenses});
    } catch (err) {
        return res.status(500).json({ message: "could not get expenses." });
    }
}

export const addAllExpenses = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userID = req.userID;
    let totalExpense = 0;

    if (!userID) {
        return res.status(401).json({message: "Unauthorized: no userID"});
    }

    try {
        const account = await Account.findOne({where: {userID: userID}})
        const expenses = await Expense.findAll({where: {accountID: account?.accountID}})
        if (!expenses || expenses.length === 0) {
              return res.status(404).json({ message: "No accounts found." });
        }
        for (const expense of expenses) {
            totalExpense += parseFloat(expense.amount as unknown as string);
        }

        return res.status(200).json({ totalExpense });
    } catch (error) {
        return res.status(400).json({message: "Error occured KAJSHDAKJHD"});
    }
} 

