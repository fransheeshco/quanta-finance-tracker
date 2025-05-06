import axios from "axios";
import { handleError } from "./ErrorHandler";
import {
  UserToken, Account, GetAccountsResponse,
  Categories, GetCategoriesResponse, Expenses,
  GetExpenseResponse, Income, GetIncomeResponse,
  Budget, GetBudgetReponse, Savings, GetSavingsResponse,
  TransactionType, GetTransactionResponse, Transactions,
  Transfer, GetTransferReponse, GetTotalExpensesResponse
} from "./interfaces/interfaces";

const api = "http://localhost:8000/api/";

export const loginAPI = async (email: string, password: string) => {
  try {
    const data = await axios.post<UserToken>(api + "auth" + "/login", {
      email: email,
      password: password,
    });
    console.log(data);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const registerAPI = async (fname: string, lname: string, email: string, password: string) => {
  try {
    const data = await axios.post<UserToken>(api + "auth" + "/signup", {
      fname, lname, email, password
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const createAccountAPI = async (
  accountType: string,
  balance: number,
  userID: number,
  token: string
) => {
  try {
    const data = await axios.post<Account>(
      `${api}auth/account/addaccount`,
      {
        accountType,
        balance,
        userID,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};


export const deleteAccountAPI = async (accountID: number, token: string,) => {
  try {
    const data = await axios.delete<Account>(
      `${api}auth/accounts/deleteaccount/${accountID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};


export const updateAccountAPI = async (accountID: number, token: string, balance: number, accountType: string) => {
  try {
    const data = await axios.patch<Account>(
      `${api}auth/accounts/updateaccount/${accountID}`,
      {
        balance,
        accountType,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};


export const fetchAccountsAPI = async (token: string) => {
  try {
    const data = await axios.get<GetAccountsResponse>(
      `${api}auth/account/getaccounts/`, // Use the correct endpoint for fetching accounts
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data)
    return data.data.accounts;  // Return the fetched data
  } catch (error) {
    handleError(error);
  }
};

export const createCategoryAPI = async (categoryName: string, token: string) => {
  try {
    const data = await axios.post<Categories>(
      `${api}auth/category/postcategories`,
      {
        categoryName
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

export const getCategoriesAPI = async (token: string) => {
  try {
    const data = await axios.get<GetCategoriesResponse>(
      `${api}auth/category/getcategories/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return data.data.categories;
  } catch (error) {
    handleError(error);
  }
}

export const updateCategoryAPI = async (categoryName: string, categoryID: number, token: string) => {
  try {
    const data = await axios.patch<Categories>(
      `${api}auth/category/${categoryID}`,
      {
        categoryName
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

export const deleteCategoryAPI = async (categoryID: number, token: string) => {
  try {
    const data = await axios.delete<Categories>(
      `${api}auth/category/${categoryID}`,
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

export const createExpenseAPI = async (token: string, title: string, amount: number, date: Date, categoryID: number
) => {
  try {
    const data = await axios.post<Expenses>(
      `${api}auth/expenses/addexpenses`, {
      title,
      amount,
      date: date.toISOString(),
      categoryID
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

export const getExpensesAPI = async (token: string) => {
  try {
    const data = await axios.get<GetExpenseResponse>(
      `${api}auth/expenses/getexpenses`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return data.data.expenses;
  } catch (error) {
    handleError(error);
  }
}

export const updateExpensesAPI = async (title: string, expenseID: number, token: string, amount: number, date: Date, categoryID: number) => {
  try {
    const data = await axios.patch<Expenses>(
      `${api}auth/expenses/updateexpenses/${expenseID}`,
      {
        title,
        amount,
        date: date.toISOString(),
        categoryID
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

export const deleteExpensesAPI = async (expenseID: number, token: string) => {
  try {
    const data = await axios.patch<Expenses>(
      `${api}auth/expenses/deleteexpense/${expenseID}`,
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

export const addTotalExpensesAPI = async (token: string) => {
  try {
    const response = await axios.get<GetTotalExpensesResponse>(`${api}auth/expenses/gettotalexpense`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Assuming the response has a `total` property inside the data
    console.log(response)
    return response.data.totalExpenses; // Ensure this returns a number
  } catch (error) {
    handleError(error);
    return 0; // Return 0 in case of an error
  }
};


export const createIncomeAPI = async (amount: number, date: Date, token: string) => {
  try {
    const data = await axios.post<Income>(
      `${api}auth/income/addincome`,
      {
        amount,
        date
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return data.data;
  } catch (error) {
    handleError(error);
  }
}

export const getIncomesAPI = async (token: string) => {
  try {
    const data = await axios.get<GetIncomeResponse>(
      `${api}auth/income/getincomes`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Log the full response to inspect it
    console.log("Full API Response:", data);

    // Now accessing the 'income' field instead of 'incomes'
    if (!data.data || !data.data.income) {
      console.error("No 'income' field found in response:", data.data);
      return [];
    }

    return data.data.income;  // Accessing the singular 'income' array
  } catch (error) {
    handleError(error);
    console.error("Error fetching incomes:", error);
    return [];
  }
};


export const deleteIncomeAPI = async (incomeID: number, token: string) => {
  try {
    const data = await axios.patch<Categories>(
      `${api}auth/income/deleteincome/${incomeID}`,
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

export const createBudgetAPI = async (token: string, budgetName: string, amount: number, startDate: Date, endDate: Date) => {
  try {
    const data = await axios.post<Budget>(
      `${api}auth/budgets/createbudget/`,
      {
        budgetName,
        amount,
        startDate,
        endDate
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

export const deleteBudgetAPI = async (token: string, budgetID: number) => {
  try {
    const data = await axios.delete<Budget>(
      `${api}auth/budgets/createbudget/${budgetID}`,
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

export const updateBudgetAPI = async (token: string, budgetID: number, budgetName: string, amount: number, endDate: Date, startDate: Date) => {
  try {
    const data = await axios.patch<Budget>(
      `${api}auth/budgets/createbudget/${budgetID}`,
      {
        budgetName,
        amount,
        endDate,
        startDate
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

export const getBudgetAPI = async (token: string) => {
  try {
    const data = await axios.get<GetBudgetReponse>(
      `${api}auth/budgets/getbudgets/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return data.data.budgets;
  } catch (error) {
    handleError(error);
  }
}

export const createSavingsAPI = async (token: string, title: string, goalAmount: number, currentAmount: number) => {
  try {
    const data = await axios.post<Savings>(
      `${api}auth/savings/addsavings`,
      {
        title,
        goalAmount,
        currentAmount
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

export const updateSavingsAPI = async (token: string, title: string, goalAmount: number, currentAmount: number, savingID: number) => {
  try {
    const data = await axios.patch<Savings>(
      `${api}auth/savings/updatesavings/${savingID}`,
      {
        title,
        goalAmount,
        currentAmount
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

export const deleteSavingsAPI = async (token: string, savingID: number) => {
  try {
    const data = await axios.delete<Savings>(
      `${api}auth/savings/deletesavings/${savingID}`,
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

export const getSavingsAPI = async (token: string) => {
  try {
    const data = await axios.get<GetSavingsResponse>(
      `${api}auth/savings/getsavings`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return data.data.savings;
  } catch (error) {
    handleError(error);

  }
}

export const createTransactionAPI = async (token: string, transactionType: TransactionType, amount: number, date: Date) => {
  try {
    const data = await axios.post<Transactions>(
      `${api}auth/transaction/addtransaction`,
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
      `${api}auth/transaction/deletetransaction/${transactionID}`,
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
      `${api}auth/transaction/updatetransaction/${transactionID}`,
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

export const getTransactionsAPI = async (token: string) => {
  try {
    const data = await axios.get<GetTransactionResponse>(
      `${api}auth/transaction/gettransactions`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return data.data.transactions;
  } catch (error) {
    handleError(error);
  }
}

export const createTransferAPI = async (
  senderID: number,
  recipientID: number,
  amount: number,
  date: string,
  token: string
) => {
  try {
    const response = await axios.post(`${api}auth/transfer`, {
      senderID,
      recipientID,
      amount,
      date
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

