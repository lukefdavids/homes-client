import { Navigate, Outlet } from "react-router-dom";
import { NavBar } from "./nav/Navbar.jsx";

export const Authorized = ({ token, setToken }) => {
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <NavBar token={token} setToken={setToken} />
      <Outlet />
    </>
  );
};
