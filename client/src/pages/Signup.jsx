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

const Signup = () => {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  // ================= HANDLE INPUT =================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= SIGNUP =================

  const handleSignup = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );

      alert(
        "Signup successful! Please login."
      );

      navigate("/login");

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Signup Failed"
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
            Create Account
          </h1>

        </div>

        <p className="auth-subtitle">
          Join EtharaFlow to manage AI workflows
        </p>

        {/* ===== FORM ===== */}

        <form
          onSubmit={handleSignup}
          className="auth-form"
        >

          {/* NAME */}

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="auth-input"
            required
          />

          {/* EMAIL */}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="auth-input"
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
              value={formData.password}
              onChange={handleChange}
              className="auth-input"
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
              ? "Creating Account..."
              : "Get Started"}

          </button>

        </form>

        {/* FOOTER */}

        <p className="auth-footer">

          Already have an account?

          <Link
            to="/login"
            className="auth-link"
          >
            Log in
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Signup;