import {
  createContext,
  useEffect,
  useState,
  useContext,
  ReactNode,
} from "react";
import { Transactions, TransactionType } from "../interfaces/interfaces";
import { GetTransactionsOptions } from "@/interfaces/QueryOptions";
import {
  createTransactionAPI,
  deleteTransactionAPI,
  updateTransactionAPI,
  getTransactionsAPI,
} from "../api/TransactionAPI";
import { toast } from "react-toastify";
import { useAuth } from "./authContext";

type TransactionsContextType = {
  transactions: Transactions[] | undefined;
  transactionCount: number;
  fetchTransactions: (options?: GetTransactionsOptions) => Promise<void>;
  createTransactions: (transactionType: TransactionType, amount: number, date: Date) => Promise<void>;
  deleteTransactions: (transactionID: number) => Promise<void>;
  updateTransactions: (transactionID: number, transactionType: TransactionType, amount: number, date: Date) => Promise<void>;
};

const TransactionContext = createContext<TransactionsContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const TransactionsProvider = ({ children }: Props) => {
  const [transactions, setTransactions] = useState<Transactions[] | undefined>(undefined);
  const [transactionCount, setTransactionCount] = useState(0);
  const { token } = useAuth(); // Use token from context

  // Fetch transactions with optional options
  const fetchTransactions = async (options: GetTransactionsOptions = {}) => {
    if (!token) return;

    try {
      const response = await getTransactionsAPI(options);
      // Check the structure of the response
      if (response && response.transactionsData && Array.isArray(response.transactionsData.rows)) {
        setTransactions(response.transactionsData.rows);
        setTransactionCount(response.transactionsData.count);
      } else {
        console.error("Unexpected data structure:", response);
        toast.error("Unexpected data structure from API.");
      }
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  // Create a new transaction
  const createTransactions = async (transactionType: TransactionType, amount: number, date: Date) => {
    if (!token) return;

    try {
      await createTransactionAPI(token, transactionType, amount, date);
      toast.success("Successfully created transaction");
      await fetchTransactions(); // Fetch updated list after creating transaction
    } catch (error) {
      toast.error("Could not create transaction.");
    }
  };

  // Update an existing transaction
  const updateTransactions = async (transactionID: number, transactionType: TransactionType, amount: number, date: Date) => {
    if (!token) return;

    try {
      await updateTransactionAPI(token, transactionType, amount, date, transactionID);
      toast.success("Successfully updated transaction");
      await fetchTransactions(); // Fetch updated list after updating transaction
    } catch (error) {
      toast.error("Could not update transaction.");
    }
  };

  // Delete a transaction
  const deleteTransactions = async (transactionID: number) => {
    if (!token) return;

    try {
      await deleteTransactionAPI(token, transactionID);
      toast.success("Transaction deleted.");
      await fetchTransactions(); // Fetch updated list after deleting transaction
    } catch (error) {
      toast.error("Could not delete transaction.");
    }
  };

  // Fetch transactions when the component mounts and whenever the token changes
  useEffect(() => {
    if (token) {
      fetchTransactions();
    }
  }, [token]);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        transactionCount,
        fetchTransactions,
        createTransactions,
        deleteTransactions,
        updateTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

// Custom hook to access transactions context
export const useTransactions = (): TransactionsContextType => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransactions must be used within a TransactionsProvider");
  }
  return context;
};
