import axios from "axios";
import { handleError } from "../ErrorHandler";
import {
  TransactionType, GetTransactionResponse, Transactions,
} from "../interfaces/interfaces";
import { GetTransactionsOptions } from "../interfaces/QueryOptions";

const api = 'http://localhost:8000/';



export const createTransactionAPI = async (token: string, transactionType: TransactionType, amount: number, date: Date) => {
    try {
      const data = await axios.post<Transactions>(
        `${api}api/auth/transaction/addtransaction`,
        {
          transactionType,
          amount,
          date
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return data;
    } catch (error) {
      handleError(error);
    }
  }
  
  export const deleteTransactionAPI = async (token: string, transactionID: number) => {
    try {
      const data = await axios.delete<Transactions>(
        `${api}api/auth/transaction/deletetransaction/${transactionID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return data;
    } catch (error) {
      handleError(error);
    }
  }
  
  export const updateTransactionAPI = async (token: string, transactionType: TransactionType, amount: number, date: Date, transactionID: number) => {
    try {
      const data = await axios.patch<Transactions>(
        `${api}api/auth/transaction/updatetransaction/${transactionID}`,
        {
          transactionType,
          amount,
          date
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return data;
    } catch (error) {
      handleError(error);
    }
  }
  
  export const getTransactionsAPI = async (options: GetTransactionsOptions = {}) => {
    const {
      page = 1,
      transactionType,
      sortField = 'createdAt',
      sortBy = 'desc',
    } = options;
  
    const queryParams = new URLSearchParams();
    queryParams.append('page', page.toString());
    if (transactionType) queryParams.append('transactionType', transactionType.toUpperCase());
    if (sortField) queryParams.append('sortField', sortField);
    if (sortBy) queryParams.append('sortBy', sortBy);
  
    const token = localStorage.getItem('token'); // or however you're storing it
  
    try {
      const response = await axios.get<GetTransactionResponse>(
        `${api}api/auth/transaction/gettransactions?${queryParams.toString()}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Update the response structure based on the actual backend response
      const transactions = response.data.transactions; // Now we're accessing the correct field
      const totalCount = response.data.transactions.count; // Access the count correctly
      
      return { transactionsData: transactions, totalCount };
      
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      throw error; 
    }
};
