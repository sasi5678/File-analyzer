import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import logo from "../assets/logo.png";
import blob from "../assets/blob.svg";
import "../styles/Login.css";

const strengthLabels = ["weak", "medium", "medium", "strong"];

const PasswordStrength = ({ onChange }) => {
  const [strength, setStrength] = useState("");

  const getStrength = (password) => {
    let strengthIndicator = -1;

    if (/[a-z]/.test(password)) strengthIndicator++;
    if (/[A-Z]/.test(password)) strengthIndicator++;
    if (/\d/.test(password)) strengthIndicator++;
    if (/[^a-zA-Z0-9]/.test(password)) strengthIndicator++;
    if (password.length >= 16) strengthIndicator++;

    return strengthLabels[strengthIndicator] || "";
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setStrength(getStrength(value));
    onChange(value);
  };

  return (
    <>
      <div className="textbox">
        <input
          type="password"
          required
          onChange={handleChange}
        />
        <label>Password</label>
      </div>

      <div className={`bars ${strength}`}>
        <div></div>
      </div>

      <div className="strength">
        {strength && `${strength} password`}
      </div>
    </>
  );
};

const AuthPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false); // toggle

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin
      ? "http://localhost:8080/api/auth/login"
      : "http://localhost:8080/api/auth/register";

    try {
      await axios.post(url, {
        username,
        password
      });

      alert(isLogin ? "Login successful" : "Registration successful");
      navigate("/main");
    } catch (err) {
      alert(isLogin ? "Login failed" : "Registration failed");
    }
  };

  return (
    <section className="page password-strength-2-page">
      <img src={blob} className="blob" />
      <div className="orbit"></div>

      <div className="card">
        <img src={logo} />
        <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
        <h3>{isLogin ? "Login to continue" : "Secure your account"}</h3>

        <form onSubmit={handleSubmit}>
          <div className="textbox">
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Username</label>
          </div>

          <PasswordStrength onChange={setPassword} />

          <button type="submit">
            {isLogin ? "Login" : "Sign Up"}
          </button>
          
          <p className="footer">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <a onClick={() => setIsLogin(false)}>Register</a>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <a onClick={() => setIsLogin(true)}>Login</a>
            </>
          )}
        </p>
        </form>

        
      </div>
    </section>
  );
};

export default AuthPage;
