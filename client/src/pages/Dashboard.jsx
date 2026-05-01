import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Sidebar from "../components/Sidebar";

import {
  Plus,
  LogOut,
} from "lucide-react";

const Dashboard = ({ user, setUser }) => {

  const [tasks, setTasks] = useState([]);

  const [users, setUsers] = useState([]);

  const [projects, setProjects] =
    useState([]);

  // ===== MODAL =====

  const [showModal, setShowModal] =
    useState(false);

  // ===== FORM =====

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
      assignedTo: "",
      project: "",
    });

  // ================= FETCH =================

  useEffect(() => {

    fetchTasks();
    fetchUsers();
    fetchProjects();

  }, []);

  // ================= FETCH TASKS =================

  const fetchTasks = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  // ================= FETCH USERS =================

  const fetchUsers = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  // ================= FETCH PROJECTS =================

  const fetchProjects = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/projects",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  // ================= HANDLE INPUT =================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= CREATE TASK =================

  const handleCreateTask = async () => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/tasks",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks();

      setFormData({
        title: "",
        description: "",
        priority: "medium",
        dueDate: "",
        assignedTo: "",
        project: "",
      });

      setShowModal(false);

    } catch (error) {

      console.log(error);

    }
  };

  // ================= STATS =================

const completedTasks = tasks.filter(
  (task) => task.status === "completed"
);

const pendingTasks = tasks.filter(
  (task) => task.status === "pending"
);

const inProgressTasks = tasks.filter(
  (task) =>
    task.status === "in-progress"
);


const overdueTasks = tasks.filter(
  (task) => {

    if (!task.dueDate)
      return false;

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(
      task.dueDate
    );

    dueDate.setHours(0, 0, 0, 0);

    return (
      dueDate < today &&
      task.status !== "completed"
    );
  }
);



  return (

    <div className="dashboard-layout">

      <Sidebar user={user} />

      <main className="dashboard-main">

        {/* ===== TOPBAR ===== */}

        <div className="topbar">

          <div>

            <h1 className="dashboard-title">
              Welcome back, {user?.name}
            </h1>

            <p className="dashboard-subtitle">
              AI-powered workflow dashboard
            </p>

          </div>

          <div className="topbar-actions">

            {/* ===== ADMIN ONLY ===== */}

            {user?.role === "admin" && (

              <button
                className="primary-btn"
                onClick={() =>
                  setShowModal(true)
                }
              >

                <Plus size={18} />

                Create Task

              </button>

            )}

            <button
              className="logout-btn"
              onClick={() => {

                localStorage.clear();

                setUser(null);
              }}
            >

              <LogOut size={18} />

              Logout

            </button>

          </div>

        </div>

        {/* ===== STATS ===== */}

        <div className="stats-grid">

  <div className="stat-card">

    <div className="stat-title">
      Total Tasks
    </div>

    <div className="stat-number">
      {tasks.length}
    </div>

  </div>

  <div className="stat-card">

    <div className="stat-title">
      Completed
    </div>

    <div className="stat-number">
      {completedTasks.length}
    </div>

  </div>

  <div className="stat-card">

    <div className="stat-title">
      Pending
    </div>

    <div className="stat-number">
      {pendingTasks.length}
    </div>

  </div>

  <div className="stat-card">

    <div className="stat-title">
      In Progress
    </div>

    <div className="stat-number">
      {inProgressTasks.length}
    </div>

  </div>

  <div className="stat-card overdue-card">

    <div className="stat-title">
      Overdue
    </div>

    <div className="stat-number">
      {overdueTasks.length}
    </div>

  </div>

</div>

        {/* ===== TASKS ===== */}

        <div className="section-header">

          <h2 className="section-title">
            Recent Tasks
          </h2>

          <p className="section-subtitle">
            Track tasks and AI evaluation quality
          </p>

        </div>

        <div className="tasks-grid">

          {tasks.length > 0 ? (

            tasks.map((task) => (

              <div
                key={task._id}
                
className={`task-card ${
  (() => {

    if (!task.dueDate)
      return false;

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(
      task.dueDate
    );

    dueDate.setHours(0, 0, 0, 0);

    return (
      dueDate < today &&
      task.status !== "completed"
    );

  })()
    ? "overdue-task"
    : ""
}`}


              >

                <div className="task-left">

                  <h3>{task.title}</h3>

                  <p>{task.description}</p>

                  <div className="task-meta">

                    <span>
                      Assigned:
                      {" "}
                      {task.assignedTo?.name ||
                        "N/A"}
                    </span>

                    <span>
                      Due:
                      {" "}
                      {task.dueDate
                        ? new Date(
                            task.dueDate
                          ).toLocaleDateString("en-GB")
                        : "No Date"}
                    </span>

                  </div>

                </div>

                <div className="task-right">

                  <div className="ai-score">

                    AI Score:
                    {" "}
                    {task.evaluationScore}/10

                  </div>

                  <div
                    className={`priority ${task.priority}`}
                  >

                    {task.priority}

                  </div>

                  <div className="status-badge">

                    {task.status}

                  </div>

                </div>

              </div>

            ))

          ) : (

            <p>No tasks available yet.</p>

          )}

        </div>

      </main>

      {/* ===== MODAL ===== */}

      {showModal && (

        <div className="modal-overlay">

          <div className="modal">

            <h2>Create New Task</h2>

            {/* TITLE */}

            <div className="form-group">

              <input
                type="text"
                name="title"
                className="input"
                placeholder="Task title"
                value={formData.title}
                onChange={handleChange}
              />

            </div>

            {/* DESCRIPTION */}

            <div className="form-group">

              <textarea
                name="description"
                className="textarea"
                placeholder="Task description"
                value={formData.description}
                onChange={handleChange}
              />

            </div>

            {/* PRIORITY */}

            <div className="form-group">

              <select
                name="priority"
                className="select"
                value={formData.priority}
                onChange={handleChange}
              >

                <option value="low">
                  Low
                </option>

                <option value="medium">
                  Medium
                </option>

                <option value="high">
                  High
                </option>

              </select>

            </div>

            {/* DUE DATE */}

            <div className="form-group">

              <input
                type="date"
                name="dueDate"
                className="input"
                value={formData.dueDate}
                onChange={handleChange}
              />

            </div>

            {/* ASSIGN USER */}

            <div className="form-group">

              <select
                name="assignedTo"
                className="select"
                value={formData.assignedTo}
                onChange={handleChange}
              >

                <option value="">
                  Select Member
                </option>

                {users
                  .filter(
                    (u) =>
                      u.role === "member"
                  )
                  .map((member) => (

                    <option
                      key={member._id}
                      value={member._id}
                    >

                      {member.name}

                    </option>

                  ))}

              </select>

            </div>

            {/* PROJECT */}

            <div className="form-group">

              <select
                name="project"
                className="select"
                value={formData.project}
                onChange={handleChange}
              >

                <option value="">
                  Select Project
                </option>

                {projects.map((project) => (

                  <option
                    key={project._id}
                    value={project._id}
                  >

                    {project.title}

                  </option>

                ))}

              </select>

            </div>

            {/* BUTTONS */}

            <div className="modal-buttons">

              <button
                className="cancel-btn"
                onClick={() => {
  setShowModal(false);

  setFormData({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    assignedTo: "",
    project: "",
  });
}}
              >
                Cancel
              </button>

              <button
                className="submit-btn"
                onClick={
                  handleCreateTask
                }
              >
                Create
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Dashboard;