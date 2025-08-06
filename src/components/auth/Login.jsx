import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = ({ setToken }) => {
  const username = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const [isUnsuccessful, setisUnsuccessful] = useState(false);

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

  return (
    <section className="columns is-centered">
      <form className="column is-two-thirds" onSubmit={handleLogin}>
        <h1 className="title">Nashville Homes</h1>
        <p className="subtitle">Please sign in</p>

        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input className="input" type="text" ref={username} />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input className="input" type="password" ref={password} />
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" type="submit">
              Submit
            </button>
          </div>
          <div className="control">
            <Link to="/register" className="button is-link is-light">
              Cancel
            </Link>
          </div>
        </div>
        {isUnsuccessful ? (
          <p className="help is-danger">Username or password not valid</p>
        ) : (
          ""
        )}
      </form>
    </section>
  );
};
