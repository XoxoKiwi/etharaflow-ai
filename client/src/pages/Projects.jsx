import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Sidebar from "../components/Sidebar";

import {
  LogOut,
  Plus,
} from "lucide-react";

const Projects = ({ user, setUser }) => {

  const [projects, setProjects] = useState([]);

  const [tasks, setTasks] = useState([]);

  const [showModal, setShowModal] =
    useState(false);

  const [
    selectedProject,
    setSelectedProject,
  ] = useState(null);

  const [
    showProjectDetails,
    setShowProjectDetails,
  ] = useState(false);

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
    });

  // ================= FETCH =================

  useEffect(() => {

    fetchProjects();
    fetchTasks();

  }, []);

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

  // ================= HANDLE INPUT =================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= CREATE PROJECT =================

  const handleCreateProject = async () => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/projects",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchProjects();

      setFormData({
        title: "",
        description: "",
      });

      setShowModal(false);

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="dashboard-layout">

      <Sidebar user={user} />

      <main className="dashboard-main">

        {/* ===== TOPBAR ===== */}

        <div className="topbar">

          <div>

            <h1 className="dashboard-title">
              Projects Workspace
            </h1>

            <p className="dashboard-subtitle">
              Manage team projects and progress
            </p>

          </div>

          <div className="topbar-actions">

            {user?.role === "admin" && (

              <button
                className="primary-btn"
                onClick={() =>
                  setShowModal(true)
                }
              >

                <Plus size={18} />

                Create Project

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

        {/* ===== PROJECTS ===== */}

        <div className="projects-grid">

          {projects.length > 0 ? (

            projects.map((project) => (

              <div
                className="project-card clickable-project"
                key={project._id}
                onClick={() => {

                  setSelectedProject(project);

                  setShowProjectDetails(true);

                }}
              >

                <div>

                  <h2>{project.title}</h2>

                  <p>
                    {project.description}
                  </p>

                </div>

                {/* ===== META ===== */}

                <div className="project-meta">

                  <div className="project-meta-item">

                    <span className="meta-label">
                      Tasks
                    </span>

                    <span className="meta-value">

                      {
                        tasks.filter(
                          (task) =>
                            task.project?._id ===
                            project._id
                        ).length
                      }

                    </span>

                  </div>

                  <div className="project-meta-item">

                    <span className="meta-label">
                      Created By
                    </span>

                    <span className="meta-value">

                      {
                        project.createdBy?.name ||
                        "Admin"
                      }

                    </span>

                  </div>

                </div>

                {/* ===== PROGRESS ===== */}

                <div className="progress-bar">

                  <div
                    className="progress-fill"
                    style={{
                      width: `${
                        40 +
                        Math.floor(
                          Math.random() * 50
                        )
                      }%`,
                    }}
                  />

                </div>

              </div>

            ))

          ) : (

            <p>
              No projects available yet.
            </p>

          )}

        </div>

      </main>

      {/* ===== PROJECT DETAILS MODAL ===== */}

      {showProjectDetails && selectedProject && (

        <div className="modal-overlay">

          <div className="project-details-modal">

            <div className="project-details-header">

              <div>

                <h2>
                  {selectedProject.title}
                </h2>

                <p>
                  {selectedProject.description}
                </p>

              </div>

              <button
                className="cancel-btn"
                onClick={() =>
                  setShowProjectDetails(false)
                }
              >
                Close
              </button>

            </div>

            <div className="project-tasks-list">

              {

                tasks.filter(
                  (task) =>
                    task.project?._id ===
                    selectedProject._id
                ).length > 0 ? (

                  tasks
                    .filter(
                      (task) =>
                        task.project?._id ===
                        selectedProject._id
                    )
                    .map((task) => (

                      <div
                        className="project-task-item"
                        key={task._id}
                      >

                        <div>

                          <h3>
                            {task.title}
                          </h3>

                          <p>
                            {task.description}
                          </p>

                          <div className="task-meta">

                            <span>
                              Assigned:
                              {" "}
                              {
                                task.assignedTo?.name ||
                                "N/A"
                              }
                            </span>

                            <span>
                              Due:
                              {" "}
                              {
                                task.dueDate
                                  ? new Date(
                                      task.dueDate
                                    ).toLocaleDateString("en-GB")
                                  : "No Date"
                              }
                            </span>

                          </div>

                        </div>

                        <div className="task-right">

                          <div
                            className={`priority ${task.priority}`}
                          >
                            {task.priority}
                          </div>

                          <div
                            className="status-badge"
                          >
                            {task.status}
                          </div>

                        </div>

                      </div>

                    ))

                ) : (

                  <p>
                    No tasks assigned to this project yet.
                  </p>

                )

              }

            </div>

          </div>

        </div>

      )}

      {/* ===== CREATE PROJECT MODAL ===== */}

      {showModal && (

        <div className="modal-overlay">

          <div className="modal">

            <h2>Create Project</h2>

            <div className="form-group">

              <input
                type="text"
                name="title"
                className="input"
                placeholder="Project title"
                value={formData.title}
                onChange={handleChange}
              />

            </div>

            <div className="form-group">

              <textarea
                name="description"
                className="textarea"
                placeholder="Project description"
                value={formData.description}
                onChange={handleChange}
              />

            </div>

            <div className="modal-buttons">

              <button
                className="cancel-btn"
                onClick={() =>
                  setShowModal(false)
                }
              >
                Cancel
              </button>

              <button
                className="submit-btn"
                onClick={
                  handleCreateProject
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

export default Projects;