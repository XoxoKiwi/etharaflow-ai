
import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";

import Sidebar from "../components/Sidebar";

import {
  LogOut,
} from "lucide-react";

const AIEvaluator = ({
  user,
  setUser,
}) => {

  const [tasks, setTasks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

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

    } finally {

      setLoading(false);

    }
  };

  // ================= AI SCORE COLORS =================

  const getScoreClass = (score) => {

    if (score <= 4)
      return "score-low";

    if (score <= 7)
      return "score-medium";

    return "score-excellent";
  };

  // ================= QUALITY LABEL =================

  const getQualityLabel = (score) => {

    if (score <= 4)
      return "Needs Improvement";

    if (score <= 7)
      return "Good Quality";

    return "Excellent";
  };

  // ================= OVERDUE CHECK =================

  const isOverdue = (task) => {

    if (!task.dueDate)
      return false;

    return (
      new Date(task.dueDate) <
        new Date() &&
      task.status?.toLowerCase() !==
        "completed"
    );
  };

  // ================= STATS =================

  const averageScore = useMemo(() => {

    if (tasks.length === 0)
      return 0;

    const total =
      tasks.reduce(
        (acc, task) =>
          acc +
          (task.evaluationScore || 0),
        0
      );

    return (
      total / tasks.length
    ).toFixed(1);

  }, [tasks]);

  return (

    <div className="dashboard-layout">

      <Sidebar user={user} />

      <main className="dashboard-main">

        {/* ===== TOPBAR ===== */}

        <div className="topbar">

          <div>

            <h1 className="dashboard-title">
              AI Task Evaluator
            </h1>

            <p className="dashboard-subtitle">
              Analyze engineering task quality using AI-inspired scoring
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

        {/* ===== LOADING ===== */}

        {loading ? (

          <p className="loading-text">
            Loading evaluations...
          </p>

        ) : (

          <>
            {/* ===== AI STATS ===== */}

            <div className="ai-stats-grid">

              <div className="ai-stat-card">

                <p className="ai-stat-label">
                  Total Evaluations
                </p>

                <h2 className="ai-stat-number">
                  {tasks.length}
                </h2>

              </div>

              <div className="ai-stat-card">

                <p className="ai-stat-label">
                  High Quality Tasks
                </p>

                <h2 className="ai-stat-number">
                  {
                    tasks.filter(
                      (task) =>
                        task.evaluationScore >= 8
                    ).length
                  }
                </h2>

              </div>

              <div className="ai-stat-card">

                <p className="ai-stat-label">
                  Needs Improvement
                </p>

                <h2 className="ai-stat-number">
                  {
                    tasks.filter(
                      (task) =>
                        task.evaluationScore <= 4
                    ).length
                  }
                </h2>

              </div>

              <div className="ai-stat-card">

                <p className="ai-stat-label">
                  Average AI Score
                </p>

                <h2 className="ai-stat-number">
                  {averageScore}
                </h2>

              </div>

            </div>

            {/* ===== SECTION HEADER ===== */}

            <div className="section-header">

              <h2 className="section-title">
                Evaluation Insights
              </h2>

              <p className="section-subtitle">
                AI-assisted workflow quality analysis for engineering tasks
              </p>

            </div>

            {/* ===== EVALUATIONS ===== */}

            <div className="tasks-grid">

              {tasks.length > 0 ? (

                tasks.map((task) => (

                  <div
                    key={task._id}
                    className={`task-card evaluator-card ${
                      isOverdue(task)
                        ? "overdue-task"
                        : ""
                    }`}
                  >

                    {/* LEFT */}

                    <div className="task-left">

                      <div className="evaluator-top-row">

                        <h3>
                          {task.title}
                        </h3>

                        <span
                          className={`quality-badge ${getScoreClass(
                            task.evaluationScore
                          )}`}
                        >

                          {getQualityLabel(
                            task.evaluationScore
                          )}

                        </span>

                      </div>

                      <p className="evaluation-feedback">

                        {
                          task.evaluationFeedback ||
                          "Task demonstrates structured implementation direction and workflow clarity."
                        }

                      </p>

                      <div className="task-meta">

                        <span>

                          Priority:
                          {" "}
                          {task.priority}

                        </span>

                        <span>

                          Status:
                          {" "}
                          {task.status}

                        </span>

                        <span>

                          Assigned:
                          {" "}
                          {task.assignedTo?.name ||
                            "N/A"}

                        </span>

                        {task.project?.title && (

                          <span>

                            Project:
                            {" "}
                            {task.project.title}

                          </span>

                        )}

                      </div>

                    </div>

                    {/* RIGHT */}

                    <div className="task-right">

                      <div
                        className={`ai-score-pill ${getScoreClass(
                          task.evaluationScore
                        )}`}
                      >

                        <span>
                          AI Score
                        </span>

                        <h2>
                          {
                            task.evaluationScore
                          }
                          /10
                        </h2>

                      </div>

                      {isOverdue(task) && (

                        <div className="overdue-pill">
                          Overdue
                        </div>

                      )}

                    </div>

                  </div>

                ))

              ) : (

                <div className="empty-state">

                  <h3>
                    No evaluations found
                  </h3>

                  <p>
                    Create and evaluate tasks to view AI workflow analysis.
                  </p>

                </div>

              )}

            </div>
          </>

        )}

      </main>

    </div>
  );
};

export default AIEvaluator;

