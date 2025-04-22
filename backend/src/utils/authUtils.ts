import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from 'bcryptjs';

dotenv.config();

const secretKey = process.env.JWT_SECRETKEY;

if (!secretKey) {
  throw new Error("Missing env vars: JWT_SECRETKEY or TOKEN_EXPIRATION");
}

export const generateToken = (userID: number): string => {
  return jwt.sign({ id: userID }, secretKey, {
    expiresIn: '3d'
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, secretKey);
}

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePasswords = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
}