import { createContext, useEffect, useState } from "react";
import { Account, GetAccountsResponse } from "../interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import { createAccountAPI, deleteAccountAPI, updateAccountAPI, fetchAccounts } from "../api";
import { toast } from "react-toastify";
import React from "react";
import { useAuth } from "./authContext";
import axios from "axios";

type AccountContextType = {
    accounts: Account[] | null;
    addAccount: (accountType: string, balance: number, userID: number, token: string) => Promise<void>;
    deleteAccount: (accountID: number, token: string) => Promise<void>;
    updateAccount: (accountID: number, balance: number, accountType: string, token: string) => Promise<void>;
    getAccounts: (userID: number, token: string) => Promise<void>;
}

type Props = { children: React.ReactNode };

const AccountContext = createContext<AccountContextType>({} as AccountContextType);

export const AccountProvider = ({ children }: Props) => {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const { user, token } = useAuth(); // assuming your authContext provides user and token
  
    useEffect(() => {
      const loadAccounts = async () => {
        if (user && token) {
          try {
            const fetched = await fetchAccounts(user.userID, token);
            if (fetched) {
              setAccounts(fetched);
            }
          } catch (err) {
            console.error("Failed to load accounts:", err);
          }
        }
      };
  
      loadAccounts();
    }, [user, token]);
  
    const getAccounts = async (userID: number, token: string) => {
      const fetched = await fetchAccounts(userID, token);
      if (fetched) {
        setAccounts(fetched);
      }
    };
  
    const addAccount = async (
      accountType: string,
      balance: number,
      userID: number,
      token: string
    ) => {
      const newAccount = await createAccountAPI(accountType, balance, userID, token);
      if (newAccount) {
        setAccounts((prev) => [...prev, newAccount.data]);
      }
    };
  
    const deleteAccount = async (accountID: number, token: string) => {
      await deleteAccountAPI(accountID, token);
      setAccounts((prev) => prev.filter((acc) => acc.accountID !== accountID));
    };
  
    const updateAccount = async (
      accountID: number,
      balance: number,
      accountType: string,
      token: string
    ) => {
      const updated = await updateAccountAPI(accountID, token, balance, accountType);
      if (updated) {
        setAccounts((prev) =>
          prev.map((acc) =>
            acc.accountID === accountID ? { ...acc, balance, accountType } : acc
          )
        );
      }
    };
  
    return (
      <AccountContext.Provider
        value={{ accounts, addAccount, deleteAccount, updateAccount, getAccounts }}
      >
        {children}
      </AccountContext.Provider>
    );
  };
  
export const useAcc = () => React.useContext(AccountContext);
  