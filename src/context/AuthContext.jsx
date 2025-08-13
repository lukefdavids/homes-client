import { createContext, useContext } from "react";
import { useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export const AuthProvider = ({ children }) => {
  const [token, setTokenState] = useState(localStorage.getItem("token"));

  const setToken = (newToken) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
    setTokenState(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  const isAuthenticated = () => {
    return !!token;
  };

  const value = {
    token,
    setToken,
    logout,
    isAuthenticated,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
