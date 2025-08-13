import { Navigate, Outlet } from "react-router-dom";
import { NavBar } from "./nav/Navbar.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export const Authorized = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
