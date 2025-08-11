import { useEffect, useState } from "react";
import ApplicationViews from "./components/ApplicationViews.jsx";
import "./App.css";
import { getCurrentUser } from "./components/services/userServices.jsx";

function App() {
  const [token, setTokenState] = useState(localStorage.getItem("token"));
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    if (token) {
      getCurrentUser(token).then(setCurrentUser);
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

  return (
    <ApplicationViews
      token={token}
      setToken={setToken}
      currentUser={currentUser}
    />
  );
}

export default App;
