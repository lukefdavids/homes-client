import { Route, Routes } from "react-router-dom";
import { Authorized } from "./Authorized";
import { Register } from "./auth/Register.jsx";
import { Login } from "./auth/Login.jsx";
import { HomesList } from "./Homes/HomesList.jsx";
import { YourHome } from "./Homes/YourHome.jsx";
import { CreateHome } from "./Homes/CreateHome.jsx";
import { EditHome } from "./Homes/EditHome.jsx";
import { Favorites } from "./Favorites.jsx";

const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Authorized />}>
        <Route path="/" element={<HomesList />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/list-your-home" element={<CreateHome />} />
        <Route path="/your-home" element={<YourHome />} />
        <Route path="/edit-home" element={<EditHome />} />
      </Route>
    </Routes>
  );
};

export default ApplicationViews;
