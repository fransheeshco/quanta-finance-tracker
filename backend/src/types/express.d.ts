import { Request } from "express";

declare module "express-serve-static-core" {
    interface Request {
        userID: number;
        accountID: number;
    }
}

declare global {
    namespace NodeJS {
      interface ProcessEnv {
        JWT_SECRETKEY: string;
      }
    }
  }
  