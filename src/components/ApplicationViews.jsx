import { Route, Routes } from "react-router-dom";
import { Authorized } from "./Authorized";
import { Register } from "./auth/Register.jsx";
import { Login } from "./auth/Login.jsx";
import { HomesList } from "./Homes/HomesList.jsx";
import { YourHome } from "./Homes/YourHome.jsx";
import { CreateHome } from "./Homes/CreateHome.jsx";
import { EditHome } from "./Homes/EditHome.jsx";

const ApplicationViews = ({ token, setToken, currentUser }) => {
  return (
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route element={<Authorized token={token} setToken={setToken} />}>
        <Route path="/" element={<HomesList token={token} />} />
        <Route path="/list-your-home" element={<CreateHome token={token} />} />
        <Route
          path="/your-home"
          element={<YourHome token={token} currentUser={currentUser} />}
        />
        <Route
          path="/edit-home"
          element={<EditHome token={token} currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  );
};

export default ApplicationViews;
