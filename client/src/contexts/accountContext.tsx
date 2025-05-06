import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
  useContext,
} from "react";
import { Account } from "../interfaces/interfaces";
import {
  createAccountAPI,
  deleteAccountAPI,
  updateAccountAPI,
  fetchAccountsAPI,
} from "../api";
import { toast } from "react-toastify";
import { useAuth } from "./authContext";

type AccountContextType = {
  accounts: Account[] | undefined;
  fetchAccounts: () => Promise<void>;
  createAccount: (accountType: string, balance: number, userID: number) => Promise<void>;
  deleteAccount: (accountID: number) => Promise<void>;
  updateAccount: (accountID: number, balance: number, accountType: string) => Promise<void>;
};

const AccountContext = createContext<AccountContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const AccountProvider = ({ children }: Props) => {
  const [accounts, setAccounts] = useState<Account[] | undefined>(undefined);
  const { user, token } = useAuth();

  const fetchAccounts = useCallback(async () => {
    if (!token) return;
    try {
      const response = await fetchAccountsAPI(token);
      if (response) setAccounts(response);
    } catch (error) {
      toast.error("Failed to fetch accounts.");
    }
  }, [token]);

  const createAccount = useCallback(
    async (accountType: string, balance: number, userID: number) => {
      if (!token) return;
  
      try {
        const newAccount = await createAccountAPI(accountType, balance, userID, token);
        if (newAccount) {
          toast.success("Account created successfully.");
          await fetchAccounts(); // re-fetch to keep it synced
        }
      } catch (error) {
        toast.error("Failed to create account.");
      }
    },
    [token, fetchAccounts]
  );

  const deleteAccount = useCallback(
    async (accountID: number) => {
      if (!token) return;
      try {
        await deleteAccountAPI(accountID, token);
        toast.success("Account deleted.");
        await fetchAccounts();
      } catch (error) {
        toast.error("Failed to delete account.");
      }
    },
    [token, fetchAccounts]
  );

  const updateAccount = useCallback(
    async (accountID: number, balance: number, accountType: string) => {
      if (!token) return;
      try {
        await updateAccountAPI(accountID, token, balance, accountType);
        toast.success("Account updated.");
        await fetchAccounts();
      } catch (error) {
        toast.error("Failed to update account.");
      }
    },
    [token, fetchAccounts]
  );

  useEffect(() => {
    if (token) {
      fetchAccounts();
    }
  }, [token, fetchAccounts]);

  return (
    <AccountContext.Provider
      value={{
        accounts,
        fetchAccounts,
        createAccount,
        deleteAccount,
        updateAccount,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccounts = (): AccountContextType => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccounts must be used within an AccountProvider");
  }
  return context;
};
