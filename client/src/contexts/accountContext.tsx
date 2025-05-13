import {
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
} from "../api/AccountAPI";
import { toast } from "react-toastify";
import { useAuth } from "./authContext";
import { GetAccountsOptions } from "@/interfaces/QueryOptions";

type AccountContextType = {
  accounts: Account[] | undefined;
  accountCount: number;
  balance: number;
  fetchAccounts: (options: GetAccountsOptions) => Promise<void>;
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
  const [accountCount, setAccountCount] = useState(0);
  const [balance, setBalance] = useState(0);
  const { token } = useAuth();

  const fetchAccounts = useCallback(
    async (
      filters: GetAccountsOptions
    ) => {
      if (!token) return;
      try {
        const response = await fetchAccountsAPI(filters);
        if (!response) return
        setAccounts(response.data.accounts);
        setAccountCount(response?.data.count);
      } catch (error) {
        toast.error("Failed to fetch accounts.");
      }
    },
    [token]
  );

  const createAccount = useCallback(
    async (accountType: string, balance: number, userID: number) => {
      if (!token) return;
      try {
        const newAccount = await createAccountAPI(accountType, balance, userID, token);
        if (newAccount) {
          toast.success("Account created successfully.");
          await fetchAccounts({ page: 1, limit: 5 }); // default sort & limit
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
        await fetchAccounts({ page: 1, limit: 5 });
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
        await fetchAccounts({ page: 1, limit: 5 });
      } catch (error) {
        toast.error("Failed to update account.");
      }
    },
    [token, fetchAccounts]
  );

  useEffect(() => {
    if (accounts) {
      const calculatedTotalBalance = accounts.reduce((acc, account) => acc + account.balance, 0);
      setBalance(calculatedTotalBalance);
    } else {
      setBalance(0); // Reset if accounts is undefined
    }
  }, [accounts]);

  return (
    <AccountContext.Provider
      value={{
        accounts,
        balance,
        accountCount,
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
