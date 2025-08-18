import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export const Login = () => {
  const username = useRef();
  const password = useRef();
  const [isUnsuccessful, setisUnsuccessful] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setisUnsuccessful(false);

    const credentials = {
      username: username.current.value,
      password: password.current.value,
    };

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (data.valid && data.token) {
        setToken(data.token);
        navigate("/");
      } else {
        setisUnsuccessful(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      setisUnsuccessful(true);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <form className="flex justify-center py-8 min-h-screen">
      <div className="w-full max-w-md px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Nashville Homes
          </h1>
          <p className="text-lg text-gray-600 mb-6">Please sign in</p>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              type="text"
              ref={username}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              type="password"
              ref={password}
            />
          </div>

          <div className="flex gap-4 mb-4 justify-center">
            <button
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              onClick={handleLogin}
            >
              Submit
            </button>
            <button
              onClick={handleCancel}
              className="px-6 py-2 bg-blue-100 text-blue-700 font-medium rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Cancel
            </button>
          </div>
          <div>
            <Link to="/register">
              <p className=" hover:text-blue-600 transition-colors duration-200">
                Not a member yet? Sign up here
              </p>
            </Link>
          </div>
          {isUnsuccessful && (
            <p className="text-sm text-red-600 mt-2">
              Username or password not valid
            </p>
          )}
        </div>
      </div>
    </form>
  );
};
