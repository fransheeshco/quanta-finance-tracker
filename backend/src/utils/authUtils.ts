import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from 'bcryptjs';

dotenv.config();

const secretKey = process.env.JWT_SECRETKEY;

if (!secretKey) {
  throw new Error("Missing env var: JWT_SECRETKEY");
}

console.log(secretKey);

interface TokenPayload extends JwtPayload {
  userID: number;
}

export const generateToken = (userID: number): string => {
  if (!userID) {
    throw new Error("Invalid userID");
  }
  return jwt.sign({ userID }, secretKey, { expiresIn: '3d' });
};

export const verifyToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, secretKey) as TokenPayload;
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
};

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};
