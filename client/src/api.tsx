import axios from "axios";
import { handleError } from "./ErrorHandler";
import { UserToken } from "./interfaces/interfaces";

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
      fname: fname,
      lname: lname,
      email: email,
      password: password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};
