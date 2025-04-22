import { Request, Response } from 'express';
import validator from "validator";
import bcrypt, { compare } from "bcryptjs";
import jwt from "jsonwebtoken"

import { User } from '../models/associationblock';


const signUp = async (req: Request, res: Response): Promise<any> => {
  const { fname, lname, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All forms must be filled." });
  }

  // check if email is valid
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Not a valid email." })
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(409).json({ message: "user already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fname, lname, email, password: hashedPassword
    });

    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating user' });
  }
};

const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  // Check for empty fields
  if (!email || !password) {
    return res.status(400).json({ message: "All fields must be filled." });
  }

  // Check if email is valid 
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Not a valid email." });
  }

  // Look for user
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }


    // Compare password
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid password." });
    }

    // ✅ Success
    return res.status(200).json({ message: "Login successful", user });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: ' i work here! ' });

  }
};


const getUsers = async (req: Request, res: Response) => {
  try {
    const Users = await User.findAll();
    res.status(200).json(Users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'could not find user' });
  }
}

export { getUsers, signUp, login };