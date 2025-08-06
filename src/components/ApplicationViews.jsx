import { Route, Routes } from "react-router-dom";
import { Authorized } from "./Authorized";
import { Login } from "./auth/Login.jsx";
import { Register } from "./auth/Register.jsx";
import { HomesList } from "./Homes/HomesList.jsx";
import { YourHome } from "./Homes/YourHome.jsx";
import { CreateHome } from "./Homes/CreateHome.jsx";

const ApplicationViews = ({ token, setToken }) => {
  return (
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route element={<Authorized token={token} setToken={setToken} />}>
        <Route path="/" element={<HomesList token={token} />} />
        <Route path="/list-your-home" element={<CreateHome token={token} />} />
        <Route path="/your-home" element={<YourHome token={token} />} />
      </Route>
    </Routes>
  );
};

export default ApplicationViews;
