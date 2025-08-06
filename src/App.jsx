import { useState } from "react";
import ApplicationViews from "./components/ApplicationViews.jsx";
import "./App.css";

function App() {
  const [token, setTokenState] = useState(localStorage.getItem("token"));

  const setToken = (newToken) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
    setTokenState(newToken);
  };

  return <ApplicationViews token={token} setToken={setToken} />;
}

export default App;
