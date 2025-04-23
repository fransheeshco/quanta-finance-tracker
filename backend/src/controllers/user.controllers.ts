import { Request, Response } from "express";
import { User, Expense, Transaction, Saving, Budget } from "../models/associationblock";

const getUserInfo = async (req: Request, res: Response): Promise<any> => {
    const userID = req.userID;

    try {
        const user = await User.findByPk(userID);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error("Error fetching user:", err); // Log the error to the console
        return res.status(500).json({ message: "Server error." });
      }
};



export { getUserInfo }