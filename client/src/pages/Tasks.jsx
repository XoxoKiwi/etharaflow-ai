import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Sidebar from "../components/Sidebar";

import {
  LogOut,
} from "lucide-react";

const Tasks = ({ user, setUser }) => {

  const [tasks, setTasks] = useState([]);

const [editingTask, setEditingTask] =
  useState(null);

const [editForm, setEditForm] =
  useState({
    title: "",
    description: "",
    priority: "medium",
    status: "pending",
    dueDate: "",
  });

  // ================= FETCH TASKS =================

  useEffect(() => {
    fetchTasks();
  }, []);

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

 // ================= UPDATE STATUS =================

const updateTaskStatus = async (
  taskId,
  status
) => {

  try {

    const token =
      localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/tasks/${taskId}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchTasks();

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.message ||
      "Failed to update task"
    );

  }
};

// ================= DELETE TASK =================

const deleteTask = async (
  taskId
) => {

  const confirmDelete =
    window.confirm(
      "Delete this task?"
    );

  if (!confirmDelete) return;

  try {

    const token =
      localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5000/api/tasks/${taskId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchTasks();

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.message ||
      "Failed to delete task"
    );

  }
};

// ================= OPEN EDIT =================

const openEditModal = (task) => {

  setEditingTask(task);

  setEditForm({
    title: task.title || "",
    description:
      task.description || "",
    priority:
      task.priority || "medium",
    status:
      task.status || "pending",
    dueDate: task.dueDate
      ? task.dueDate.split("T")[0]
      : "",
  });
};

// ================= UPDATE TASK =================

const updateTask = async () => {

  try {

    const token =
      localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/tasks/${editingTask._id}`,
      editForm,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setEditingTask(null);

    fetchTasks();

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.message ||
      "Failed to update task"
    );

  }
};
  // ================= OVERDUE =================

  const isOverdue = (task) => {

    if (!task.dueDate) return false;

    return (
      new Date(task.dueDate) <
        new Date() &&
      task.status !== "completed"
    );
  };

  return (

    <div className="dashboard-layout">

      <Sidebar user={user} />

      <main className="dashboard-main">

        {/* ===== TOPBAR ===== */}

        <div className="topbar">

          <div>

            <h1 className="dashboard-title">
              Tasks Management
            </h1>

            <p className="dashboard-subtitle">
              Monitor task status and deadlines
            </p>

          </div>

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

        {/* ===== TASKS ===== */}

        <div className="tasks-grid">

          {tasks.length > 0 ? (

            tasks.map((task) => (

              <div
                key={task._id}
                className={`task-card ${
                  isOverdue(task)
                    ? "overdue-task"
                    : ""
                }`}
              >

                {/* LEFT */}

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

                    <span>

                      Project:
                      {" "}
                      {task.project?.title ||
                        "No Project"}

                    </span>

                  </div>

                </div>

                {/* RIGHT */}

                <div className="task-right">

                  {/* AI SCORE */}

                  <div className="ai-score">

                    AI Score:
                    {" "}
                    {task.evaluationScore}/10

                  </div>

                  {/* PRIORITY */}

                  <div
                    className={`priority ${task.priority}`}
                  >

                    {task.priority}

                  </div>

                  {/* STATUS DROPDOWN */}

                  <select
                    className={`status-select ${task.status}`}
                    value={task.status}
                    onChange={(e) =>
                      updateTaskStatus(
                        task._id,
                        e.target.value
                      )
                    }
                  >

                    <option value="pending">
                      Pending
                    </option>

                    <option value="in-progress">
                      In Progress
                    </option>

                    <option value="completed">
                      Completed
                    </option>

                  </select>
                  {/* ADMIN ACTIONS */}

{user?.role === "admin" && (

  <div className="task-actions">

    <button
      className="edit-btn"
      onClick={() =>
        openEditModal(task)
      }
    >
      Edit
    </button>

    <button
      className="delete-btn"
      onClick={() =>
        deleteTask(task._id)
      }
    >
      Delete
    </button>

  </div>

)}

                </div>

              </div>

            ))

          ) : (

            <p>No tasks available yet.</p>

          )}

        </div>
        {/* EDIT MODAL */}

{editingTask && (

  <div className="modal-overlay">

    <div className="edit-modal">

      <h2>Edit Task</h2>

      <input
        type="text"
        placeholder="Title"
        value={editForm.title}
        onChange={(e) =>
          setEditForm({
            ...editForm,
            title: e.target.value,
          })
        }
      />

      <textarea
        placeholder="Description"
        value={editForm.description}
        onChange={(e) =>
          setEditForm({
            ...editForm,
            description:
              e.target.value,
          })
        }
      />

      <select
        value={editForm.priority}
        onChange={(e) =>
          setEditForm({
            ...editForm,
            priority:
              e.target.value,
          })
        }
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

      <select
        value={editForm.status}
        onChange={(e) =>
          setEditForm({
            ...editForm,
            status:
              e.target.value,
          })
        }
      >

        <option value="pending">
          Pending
        </option>

        <option value="in-progress">
          In Progress
        </option>

        <option value="completed">
          Completed
        </option>

      </select>

      <input
        type="date"
        value={editForm.dueDate}
        onChange={(e) =>
          setEditForm({
            ...editForm,
            dueDate:
              e.target.value,
          })
        }
      />

      <div className="modal-buttons">

        <button
          className="save-btn"
          onClick={updateTask}
        >
          Save
        </button>

        <button
          className="cancel-btn"
          onClick={() =>
            setEditingTask(null)
          }
        >
          Cancel
        </button>

      </div>

    </div>

  </div>

)}

      </main>

    </div>
  );
};

export default Tasks;