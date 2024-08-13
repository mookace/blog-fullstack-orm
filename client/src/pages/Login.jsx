import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const Login = () => {
  const [inputs, setInputs] = useState({
    email: " ",
    password: " ",
  });

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [err, setError] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          required
        />
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}
        <span>
          Don't you have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};
