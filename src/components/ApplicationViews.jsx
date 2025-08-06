import { Route, Routes } from "react-router-dom";
import { Authorized } from "./Authorized";
import { Login } from "./auth/Login.jsx";
import { Register } from "./auth/Register.jsx";
import { HomesList } from "./HomesList.jsx";

const ApplicationViews = ({ token, setToken }) => {
  return (
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route element={<Authorized token={token} setToken={setToken} />}>
        <Route path="/" element={<HomesList token={token} />} />
      </Route>
    </Routes>
  );
};

export default ApplicationViews;
