import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const NavBar = () => {
  const navigate = useNavigate();
  const { token, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    closeMenu();
  };

  return (
    <header className="">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <Link to="/" onClick={closeMenu}>
            <img
              src="../logo.PNG"
              alt="Nashville Homes Logo"
              className="h-20 w-auto"
            />
          </Link>
        </div>

        {/* Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="flex flex-col justify-center items-center w-12 h-12 space-y-1 focus:outline-none"
          aria-label="Toggle menu"
        >
          <span
            className={`w-8 h-1 bg-gray-700 transition-transform duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`w-8 h-1 bg-gray-700 transition-opacity duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`w-8 h-1 bg-gray-700 transition-transform duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Slide-out Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-100 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <button
            onClick={closeMenu}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            aria-label="Close menu"
          >
            ×
          </button>

          <nav className="mt-8 flex flex-col space-y-4">
            {token ? (
              <>
                <NavLink
                  to="/"
                  onClick={closeMenu}
                  className="text-gray-700 hover:text-blue-600 font-large py-2 border-b border-gray-200"
                >
                  Home
                </NavLink>
                <NavLink
                  to="/list-your-home"
                  onClick={closeMenu}
                  className="text-gray-700 hover:text-blue-600 font-large py-2 border-b border-gray-200"
                >
                  List Your Home
                </NavLink>
                <NavLink
                  to="/favorites"
                  onClick={closeMenu}
                  className="text-gray-700 hover:text-blue-600 font-large py-2 border-b border-gray-200"
                >
                  Favorites
                </NavLink>
                <NavLink
                  to="/your-home"
                  onClick={closeMenu}
                  className="text-gray-700 hover:text-blue-600 font-large py-2 border-b border-gray-200"
                >
                  Your Home
                </NavLink>
                <button
                  onClick={handleLogout}
                  className=" text-gray-700 hover:text-blue-600 font-large py-2 border-b border-gray-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={closeMenu}
                  className="text-gray-700 hover:text-blue-600 font-large py-2 border-b border-gray-200"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={closeMenu}
                  className="text-gray-700 hover:text-blue-600 font-large py-2 border-b border-gray-200"
                >
                  Register
                </NavLink>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40" onClick={closeMenu}></div>
      )}
    </header>
  );
};
