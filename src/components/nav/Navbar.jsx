import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

export const NavBar = ({ token, setToken }) => {
  const navigate = useNavigate();
  return (
    <ul className="navbar pb-10">
      {token ? (
        <>
          <li className="navbar__item">
            <button
              onClick={() => {
                localStorage.removeItem("token");
                setToken(null);
                navigate("/login");
              }}
            >
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li className="navbar__item">
            <NavLink to={"/login"}>Login</NavLink>
          </li>
          <li className="navbar__item">
            <NavLink to={"/register"}>Register</NavLink>
          </li>
        </>
      )}
    </ul>
  );
};
