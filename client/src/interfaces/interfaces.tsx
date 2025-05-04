import { ReactNode } from 'react';


export type UserToken = {
  token: string;
  user: {
    userID: number;
    fname: string;
    email: string;
  }
};

export type User = {
  userID: number;
  fname: string;
  email: string;
}

export type Account = {
  accountID: number;
  balance: number;
  accountType: string;
}

export type GetAccountsResponse = {
  message: string;
  accounts: Account[];
};