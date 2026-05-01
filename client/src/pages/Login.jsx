import React, { useState } from "react";

import axios from "axios";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Sparkles,
  Eye,
  EyeOff,
} from "lucide-react";

const Login = ({ setUser }) => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  // ================= LOGIN =================

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      setUser(res.data.user);

      navigate("/dashboard");

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Login Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="auth-page">

      <div className="auth-card">

        {/* ===== LOGO ===== */}

        <div className="auth-logo">

          <div className="auth-icon">

            <Sparkles size={28} />

          </div>

          <h1 className="auth-title">
            Welcome Back
          </h1>

        </div>

        <p className="auth-subtitle">
          Sign in to manage your AI workflows
        </p>

        {/* ===== FORM ===== */}

        <form
          onSubmit={handleLogin}
          className="auth-form"
        >

          {/* EMAIL */}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="auth-input"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            required
          />

          {/* PASSWORD */}

          <div className="password-wrapper">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              placeholder="Password"
              className="auth-input"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
              required
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >

              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}

            </button>

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            className="auth-button"
          >

            {loading
              ? "Signing In..."
              : "Sign In"}

          </button>

        </form>

        {/* FOOTER */}

        <p className="auth-footer">

          Don't have an account?

          <Link
            to="/signup"
            className="auth-link"
          >
            Sign up
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Login;