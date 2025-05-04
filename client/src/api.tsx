import axios from "axios";
import { handleError } from "./ErrorHandler";
import { UserToken, Account, GetAccountsResponse } from "./interfaces/interfaces";

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
        userID,
        accountType,
        balance,
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


export const deleteAccountAPI = async (accountID: number, token: string, ) => {
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


export const fetchAccounts = async (userID: number, token: string) => {
  try {
    const data = await axios.get<GetAccountsResponse>(
      `${api}auth/account/getaccounts/${userID}`, // Use the correct endpoint for fetching accounts
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data.data.accounts;  // Return the fetched data
  } catch (error) {
    handleError(error);
  }
};



