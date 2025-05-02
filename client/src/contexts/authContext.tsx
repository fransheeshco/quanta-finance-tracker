import { createContext, useEffect, useState } from "react";
import { User } from "../interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../api";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";

type UserContextType = {
    user: User | null;
    token: string | null;
    registerUser: (email: string, fname: string, lname: string, password: string) => Promise<void>;
    loginUser: (username: string, password: string) => Promise<void>;
    logout: () => void;
    isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        
        if (user && token) {
            try {
                const parsedUser: User = JSON.parse(user);  // Ensure it's parsed correctly as `User` type
                setUser(parsedUser);  // Set the user state with the parsed data
                setToken(token);  // Set the token
                axios.defaults.headers.common["Authorization"] = "Bearer " + token;  // Set axios authorization header
            } catch (error) {
                console.error("Error parsing user data from localStorage:", error);
                // Handle the error, e.g., clear invalid data
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            }
        }
        
        setIsReady(true);
        
    }, []);

    const registerUser = async (
        email: string,
        fname: string,
        lname: string,
        password: string
    ) => {
        await registerAPI(fname, lname, email, password)
            .then((res) => {
                if (res) {
                    localStorage.setItem("token", res?.data.token);
                    const userObj = {
                        fname: res?.data.user.fname,
                        email: res?.data.user.email,
                    };
                    localStorage.setItem("user", JSON.stringify(userObj));
                    setToken(res?.data.token!);
                    setUser(userObj!);
                    toast.success("Login Success!");
                    navigate("/home");
                }
            })
            .catch((e) => toast.warning("Server error occured"));
    };

    const loginUser = async (email: string, password: string) => {
        await loginAPI(email, password)
            .then((res) => {
                if (res) {
                    console.log(res.data.user.email, res.data.user.fname);
                    console.log("API Response Data:", res.data);

                    const userObj = {
                        fname: res?.data.user.fname,
                        email: res?.data.user.email,
                    };
                    localStorage.setItem("token", res?.data.token);
                    localStorage.setItem("user", JSON.stringify({ email: res.data.user.email, fname: res.data.user.fname }));
                    setToken(res?.data.token!);
                    setUser(userObj!);
                    toast.success("Login Success!");
                    navigate("/home");
                }
            })
            .catch((e) => toast.warning("Server error occured"));
    };

    const isLoggedIn = () => {
        return !!user;
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken("");
        navigate("/");
    };

    return (
        <UserContext.Provider
            value={{ loginUser, user, token, logout, isLoggedIn, registerUser }}
        >
            {isReady ? children : null}
        </UserContext.Provider>
    );
};

export const useAuth = () => React.useContext(UserContext);