import React from "react";

import { NavLink } from "react-router-dom";

const Sidebar = ({ user }) => {

  return (

    <aside className="sidebar">

      <div>

        {/* ===== LOGO ===== */}

        <div className="sidebar-logo">

          <div className="logo-icon">
            ✦
          </div>

          <div className="sidebar-text">

            <h2>EtharaFlow AI</h2>

            <p>Workflow Intelligence</p>

          </div>

        </div>

        {/* ===== NAVIGATION ===== */}

        <nav className="sidebar-nav">

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "nav-item active"
                : "nav-item"
            }
          >
            <span className="nav-text">
              Dashboard
            </span>
          </NavLink>

          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive
                ? "nav-item active"
                : "nav-item"
            }
          >
            <span className="nav-text">
              Projects
            </span>
          </NavLink>

          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              isActive
                ? "nav-item active"
                : "nav-item"
            }
          >
            <span className="nav-text">
              Tasks
            </span>
          </NavLink>

          <NavLink
            to="/ai-evaluator"
            className={({ isActive }) =>
              isActive
                ? "nav-item active"
                : "nav-item"
            }
          >
            <span className="nav-text">
              AI Evaluator
            </span>
          </NavLink>

        </nav>

      </div>

      {/* ===== USER ===== */}

      <div className="sidebar-user">

        <div className="user-avatar">
          {user?.name?.charAt(0)?.toUpperCase()}
        </div>

        <div className="user-info">

          <h4>{user?.name}</h4>

          <p>{user?.role}</p>

        </div>

      </div>

    </aside>
  );
};

export default Sidebar;