import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import logo from "../assets/logo.png";
import blob from "../assets/blob.svg";
import "../styles/Login.css";

const strengthLabels = ["weak", "medium", "medium", "strong"];


const API_URL = import.meta.env.VITE_API_URL;

const PasswordStrength = ({ onChange, error,isLogin }) => {
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
          id="password"
          type="password"
          required
          onChange={handleChange}
        />
        <label>Password</label>
      </div>

      

      {

          isLogin ? (
            <>

            {
                error ? ( <p id='login-error' className= 'error-box' style={{ color: "red", textAlign: "left",}}> {error}</p> ) : 
                (<p  className= 'error-box' style={{ color: "var(--color-muted)", textAlign: "left",}}> Enter a valid user and password</p>)
                }
             
            </>

          )
          :
          (
          <>
            <div className={`bars ${strength}`}>
              <div></div>
            </div>
            <div className="strength">
                {strength && `${strength} password`}
            </div>
          </>
          )

      }
      
    </>
  );
};

const AuthPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false); 
  const [error,setError] = useState("")


  
  const handleSubmit = async (e) => {
  e.preventDefault();

  const url = isLogin
    ? `${API_URL}/api/auth/login`
    : `${API_URL}/api/auth/register`;

  try {
    const payload = isLogin
      ? { username, password }
      : { email, username, password };

    const res = await axios.post(url, payload);

    const token = res.data.token;     // ✅ get token
    localStorage.setItem("token", token); // ✅ store token
    localStorage.setItem("username", username);

    console.log("Token saved:", token);

    alert(isLogin ? "Login successful" : "Registration successful");
    navigate("/main");

  } catch (err) {
    if (!isLogin) {
      alert("Username already exists");
    }
    setError("Invalid Username or Password.");
  }
};


  return (
    <section className="page password-strength-page">
      <img src={blob} className="blob" />
      <div className="orbit"></div>

      <div className="card">
        <img src={logo} />
        <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>

        <form onSubmit={handleSubmit}>
          
          
          {
            isLogin ? (

          <>
              <div className="textbox">
                <input
                  type="text"
                  required
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label>Username</label>
               </div>

                <PasswordStrength onChange={setPassword} error={error} isLogin={isLogin}/>
          
          </>
            )
            : 
            (
          <>
               <div className="textbox">
                  <input
                    type="email"
                    required
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label>email</label>
              </div>

              <div className="textbox">
                <input
                  type="text"
                  id="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label>Username</label>
            </div>
         

          <PasswordStrength onChange={setPassword} error={error} isLogin={isLogin}/>
          
           </>
            )
          }
          
          
          

          <button id='login-btn' type="submit">
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
              <a id="go-login" onClick={() => setIsLogin(true)}>Login</a>
            </>
          )}
        </p>
        </form>

        
      </div>
    </section>
  );
};

export default AuthPage;
