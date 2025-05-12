import axios from "axios";
import { handleError } from "../ErrorHandler";
import {
    Account, GetAccountsResponse,
} from "../interfaces/interfaces";
import { GetAccountsOptions } from "@/interfaces/QueryOptions";

const api = "http://localhost:8000/api/";


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
            `${api}auth/account/deleteaccount/${accountID}`,
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
            `${api}auth/account/updateaccount/${accountID}`,
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

export const fetchAccountsAPI = async (options: GetAccountsOptions = {}
): Promise<GetAccountsResponse | undefined> => {
    const {
        page = 1,
        accountID,
        sortField = "createdAt",
        sortBy = "desc",
    } = options;

    const queryParams = new URLSearchParams();
    queryParams.append("page", page.toString());
    if (accountID) queryParams.append("accountID", accountID.toString());
    if (sortField) queryParams.append("sortField", sortField);
    if (sortBy) queryParams.append("sortBy", sortBy);

    const token = localStorage.getItem("token");

    try {
        const response = await axios.get<GetAccountsResponse>(
            `${api}auth/account/getaccounts?${queryParams.toString()}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log(response.data);

        return {
            message: response.data.message,
            data: { // Return the 'data' property as defined in the interface
                count: response.data.data.count ?? 0,
                accounts: response.data.data.accounts ?? [], // Use 'accounts' to match the interface
                currentPage: response.data.data.currentPage, // Include currentPage if present
                totalPages: response.data.data.totalPages,   // Include totalPages if present
            }
        }
    } catch (error) {
        handleError(error);
    }
};