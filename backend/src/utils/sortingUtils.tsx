import express from "express";
import { Request, Response } from "express";
import { Account } from "../models/associationblock";

export const getByAccountBalance = async (req: Request, res: Response) => {
    const sortOrder = await Account.findAll({})
}

