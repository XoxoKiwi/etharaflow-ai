import React, { useState, useEffect } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";

import AnimatedBackground from "./components/AnimatedBackground";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import AIEvaluator from "./pages/AIEvaluator";

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

  }, []);

  return (

    <BrowserRouter>

      <AnimatedBackground />

      <div className="app-container">

        <Routes>

          <Route
            path="/login"
            element={
              !user
                ? <Login setUser={setUser} />
                : <Navigate to="/dashboard" />
            }
          />

          <Route
            path="/signup"
            element={
              !user
                ? <Signup />
                : <Navigate to="/dashboard" />
            }
          />

          <Route
            path="/dashboard"
            element={
              user
                ? (
                  <Dashboard
                    user={user}
                    setUser={setUser}
                  />
                )
                : <Navigate to="/login" />
            }
          />

          <Route
            path="/projects"
            element={
              user
                ? (
                  <Projects
                    user={user}
                    setUser={setUser}
                  />
                )
                : <Navigate to="/login" />
            }
          />

          <Route
            path="/tasks"
            element={
              user
                ? (
                  <Tasks
                    user={user}
                    setUser={setUser}
                  />
                )
                : <Navigate to="/login" />
            }
          />

          <Route
            path="/ai-evaluator"
            element={
              user
                ? (
                  <AIEvaluator
                    user={user}
                    setUser={setUser}
                  />
                )
                : <Navigate to="/login" />
            }
          />

          <Route
            path="/"
            element={<Navigate to="/dashboard" />}
          />

        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;