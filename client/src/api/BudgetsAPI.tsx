import axios from "axios";
import { handleError } from "../ErrorHandler";
import { Budget, GetBudgetResponse } from "../interfaces/interfaces";

const api = 'http://localhost:8000/';



export const createBudgetAPI = async (token: string, budgetName: string, amount: number, startDate: Date, endDate: Date) => {
  try {
    const response = await axios.post<Budget>(
      `${api}api/auth/budgets/createbudget/`,
      {
        budgetName,
        amount,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteBudgetAPI = async (token: string, budgetID: number) => {
  try {
    const response = await axios.delete<Budget>(
      `${api}api/auth/budgets/deletebudget/${budgetID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateBudgetAPI = async (token: string, budgetID: number, budgetName: string, amount: number, startDate: Date, endDate: Date) => {
  try {
    const response = await axios.patch<Budget>(
      `${api}api/auth/budgets/updatebudget/${budgetID}`,
      {
        budgetName,
        amount,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getBudgetAPI = async ({
  token,
  sortField,
  sortBy,
  page,
}: {
  token: string;
  sortField: string;
  sortBy: "asc" | "desc";
  page: number;
}): Promise<GetBudgetResponse> => {
  try {
    const response = await axios.get<GetBudgetResponse>(
        `${api}api/auth/budgets/getbudgets`,
        {
          params: {
            page,
            sortField,
            sortBy,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      

    // Log the response to ensure proper structure
    console.log(response.data);

    return {
      message: response.data.message,
      count: response.data.count,  // This should now be correctly mapped
      budgets: response.data.budgets,
    };
  } catch (error) {
    console.error('Error fetching budgets:', error);
    throw new Error('Failed to fetch budgets');
  }
};
