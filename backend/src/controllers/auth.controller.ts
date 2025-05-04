import { Request, Response } from 'express';
import validator from "validator";
import { generateToken, comparePasswords, hashPassword } from '../utils/authUtils';

import { User } from '../models/associationblock';


const signUp = async (req: Request, res: Response): Promise<any> => {
  const { fname, lname, email, password } = req.body;

  if (!fname || !lname || !email || !password) {
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

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      fname, lname, email, password: hashedPassword
    });
    const token = generateToken(newUser.userID)
    res.status(201).json({ message: "Login successful", token, user: {
      fname: newUser.fname,
      email: newUser.email
    }
   });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating user' });
  }
};

const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  // Check for empty fields
  if (!email || !password ) {
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
    const match = await comparePasswords(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid password." });
    }

    // ✅ Success
    const token = generateToken(user.userID)
    return res.status(200).json({ message: "Login successful", token, user: {
      userID: user.userID,
      fname: user.fname,
      email: user.email
    }
   });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error has occured.' });
  }
};

export { signUp, login };