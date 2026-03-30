import React, { useState } from "react";
import "./loginPage.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  // 🔐 LOGIN FUNCTION
  const handleLogin = async (e) => {
    e.preventDefault();

    const regNo = e.target[0].value;
    const password = e.target[1].value;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ regNo, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("regNo", regNo);
        alert("Login Successful ✅");
        navigate("/home");
      } else {
        alert(data.error || "Invalid Credentials ❌");
      }
    } catch (err) {
      console.log(err);
      alert("Server Error ⚠️");
    }
  };

  // 📝 SIGNUP FUNCTION
  const handleSignup = async (e) => {
    e.preventDefault();

    const regNo = e.target[1].value;
    const password = e.target[4].value;
    const confirmPassword = e.target[5].value;

    if (password !== confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters ⚠️");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ regNo, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Account Created ✅");
        setIsLogin(true);
      } else {
        alert(data.error || "Signup Failed ❌");
      }
    } catch (err) {
      console.log(err);
      alert("Server Error ⚠️");
    }
  };
  return (
    <div className="container">
      <div className="glass-box">
        <div className="logo-container">
          <img src={logo} alt="VIT Logo" className="university-logo" />
        </div>

        <h1 className="title">M.P.C</h1>

        {isLogin ? (
          <form onSubmit={handleLogin} className="fade-in">
            <h2>Student Login</h2>

            <input type="text" placeholder="Registration Number" required />
            <input type="password" placeholder="Password" required />

            <button type="submit">Login</button>

            <p>
              Don't have an account?{" "}
              <span onClick={toggleForm}>Create Account</span>
            </p>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="fade-in">
            <h2>Create Account</h2>

            <input type="text" placeholder="Full Name" required />
            <input type="text" placeholder="Registration Number" required />
            <input type="text" placeholder="Branch" required />
            <input type="number" placeholder="Current Year" required />
            <input type="password" placeholder="Password" required />
            <input type="password" placeholder="Confirm Password" required />

            <button type="submit">Sign Up</button>

            <p>
              Already have an account? <span onClick={toggleForm}>Login</span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
