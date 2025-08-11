import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const NavBar = ({ token, setToken }) => {
  const navigate = useNavigate();
  return (
    <ul
      className="flex flex-auto justify-between items-center min-h-8 w-full p-2
    "
    >
      {token ? (
        <>
          <li className="flex">
            <Link to="/">
              <img
                src="../logo.PNG"
                alt="Nashville Homes Logo"
                className="flex flex-auto max-h-20"
              />
            </Link>
          </li>
          <li className="flex">
            <NavLink to={"/list-your-home"}>List Your Home</NavLink>
          </li>
          <li className="flex">
            <NavLink to={"/your-home"}>Your Home</NavLink>
          </li>

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
