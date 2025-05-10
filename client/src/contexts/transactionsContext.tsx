import React, {
    createContext,
    useEffect,
    useState,
    useCallback,
    useMemo,
    ReactNode,
    useContext,
} from "react";
import { Transactions, TransactionType } from "../interfaces/interfaces";
import {
    createTransactionAPI,
    deleteTransactionAPI,
    updateTransactionAPI,
    getTransactionsAPI,
} from "../api";
import { toast } from "react-toastify";
import { useAuth } from "./authContext";

type TransactionsContextType = {
    transactions: Transactions[] | undefined;
    fetchTransactions: () => Promise<void>;
    createTransactions: (transactionType: TransactionType, amount: number, date: Date) => Promise<void>;
    deleteTransactions: (transactionID: number) => Promise<void>;
    updateTransactions: (transactionID: number, transactionType: TransactionType, amount: number, date: Date) => Promise<void>
}

const TransactionContext = createContext<TransactionsContextType | undefined>(undefined);

type Props = {
    children: ReactNode;
}

export const TransactionsProvider = ({ children }: Props) => {
    const [transactions, setTransactions] = useState<Transactions[] | undefined>(undefined);
    const { token } = useAuth();

    const fetchTransactions = async () => {
        if (!token) return;
        try {
            const response = await getTransactionsAPI(token);
            if (response) setTransactions(response);
        } catch (error) {
            toast.error("Could not fetch Transactions."); 
        }
    }

    const createTransactions = async (transactionType: TransactionType, amount: number, date: Date) => {
        if (!token) return;

        try {
            await createTransactionAPI(token, transactionType, amount, date);
            toast.success("Successfully created transaction");
            await fetchTransactions();
        } catch (error) {
            toast.error("Could not create transaction."); 
        }
    }

    const updateTransactions =  async (transactionID: number, transactionType: TransactionType, amount: number, date: Date) => {
        if(!token) return
        try {
            await updateTransactionAPI(token, transactionType , amount, date, transactionID);
            await fetchTransactions();
            toast.success("Successfully updated transaction");
        } catch (error) {
            toast.error("Could not update transaction.");
        }
    }

    const deleteTransactions = async (transactionID: number) => {
        if (!token) return;
        try {
            await deleteTransactionAPI(token, transactionID);
            await fetchTransactions();
            toast.success("Deleted Transaction.");
        } catch (error) {
            toast.error("Could not delete transaction.");
        }
    }

    useEffect(() => {
        if(token) {
            fetchTransactions();
        }
    }, []) 

    return (
        <>
            <TransactionContext.Provider value={{
                transactions, 
                fetchTransactions,
                deleteTransactions,
                updateTransactions,
                createTransactions
            }}> {children}

            </TransactionContext.Provider>
        </>
    )
}

export const useTransactions = (): TransactionsContextType => {
    const context = useContext(TransactionContext);
    if (!context) {
      throw new Error("useTransactions must be used within a TransactionsProvider");
    }
    return context;
  };
   