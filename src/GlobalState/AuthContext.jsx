import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { redirect } from "react-router-dom";
import { setAuthToken } from "../utils/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    // Check login status and setup token
    const initializeAuth = useCallback(() => {
        const token = localStorage.getItem("authToken");
        const storedUser = localStorage.getItem("authUser");
        if (token) {
            setAuthToken(token);
            setUser(JSON.parse(storedUser));
            setIsLoggedIn(true);
        } else {
            setAuthToken(null);
            setUser(null);
            setIsLoggedIn(false);
        }
    }, []);

    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);


    const login = (userData, token) => {
        localStorage.setItem("authUser", JSON.stringify(userData));
        localStorage.setItem("authToken", token);
        setAuthToken(token);
        setUser(userData);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem("authUser");
        localStorage.removeItem("authToken");
        localStorage.removeItem("cart");
        setUser(null);
        setAuthToken(null);
        setIsLoggedIn(false);
        redirect("/");
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
