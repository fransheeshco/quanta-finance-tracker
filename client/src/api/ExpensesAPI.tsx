import axios from "axios";
import { handleError } from "../ErrorHandler";
import { Expenses, GetExpenseResponse } from "../interfaces/interfaces";
import { GetExpensesOptions } from "@/interfaces/QueryOptions";

const api = import.meta.env.VITE_API_BASE_URL;


export const createExpenseAPI = async (
  token: string,
  title: string,
  amount: number,
  date: Date,
  categoryID: number
): Promise<Expenses | undefined> => {
  try {
    const res = await axios.post<Expenses>(
      `${api}api/auth/expenses/addexpenses`,
      {
        title,
        amount,
        date: date.toISOString().split("T")[0], // or .toISOString() if backend expects it
        categoryID,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const getExpensesAPI = async (
  options: GetExpensesOptions = {}
): Promise<GetExpenseResponse | undefined> => {
  const {
    page = 1,
    categoryID,
    sortField = "createdAt",
    sortBy = "desc",
  } = options;

  const queryParams = new URLSearchParams();
  queryParams.append("page", page.toString());
  if (categoryID) queryParams.append("categoryID", categoryID.toString());
  if (sortField) queryParams.append("sortField", sortField);
  if (sortBy) queryParams.append("sortBy", sortBy);

  const token = localStorage.getItem("token");

  try {
    const res = await axios.get(`${api}api/auth/expenses/getexpenses?${queryParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("API response:", res.data);

    return {
      message: res.data.message,
      expenses: {
        count: res.data.count ?? 0,
        rows: res.data.expenses ?? [],
      },
    };
  } catch (error) {
    handleError(error);
  }
};

export const updateExpensesAPI = async (
  title: string,
  expenseID: number,
  token: string,
  amount: number,
  date: Date,
  categoryID: number
): Promise<Expenses | undefined> => {
  try {
    const res = await axios.patch<Expenses>(
      `${api}api/auth/expenses/updateexpenses/${expenseID}`,
      {
        title,
        amount,
        date: date.toISOString().split("T")[0],
        categoryID,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteExpensesAPI = async (
  expenseID: number,
  token: string
): Promise<Expenses | undefined> => {
  try {
    const res = await axios.delete<Expenses>(
      `${api}api/auth/expenses/deleteexpense/${expenseID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    handleError(error);
  }
};
