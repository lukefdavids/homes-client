import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { getUsersHomes } from "../components/services/homeService";
import { getCurrentUser } from "../components/services/userServices";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export const AuthProvider = ({ children }) => {
  const [token, setTokenState] = useState(localStorage.getItem("token"));
  const [userHome, setUserHome] = useState(null);
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    if (token) {
      getUsersHomes(token)
        .then(setUserHome)
        .catch(() => setUserHome(null));
      getCurrentUser(token).then(setCurrentUser);
    } else {
      setUserHome(null);
    }
  }, [token]);
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
    userHome,
    setUserHome,
    currentUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
