const Task = require("../models/Task");

const {
  evaluateTask,
} = require("../utils/evaluator");

// ================= CREATE TASK =================

exports.createTask = async (req, res) => {

  try {

    const {
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      project,
    } = req.body;

    // ===== VALIDATION =====

    if (!title || !description) {

      return res.status(400).json({
        message:
          "Title and description are required",
      });

    }

    // ===== AI EVALUATION =====

    const evaluation =
      evaluateTask(description);

    // ===== CREATE TASK =====

    const task = await Task.create({

      title,
      description,
      priority,
      dueDate,
      assignedTo,
      project,

      // ALWAYS START AS PENDING
      status: "pending",

      createdBy: req.user.id,

      evaluationScore:
        evaluation.score,

      evaluationFeedback:
        evaluation.feedback,
    });

    // ===== POPULATE =====

    const populatedTask =
      await Task.findById(task._id)
        .populate(
          "assignedTo",
          "name email"
        )
        .populate(
          "project",
          "title"
        );

    res.status(201).json(
      populatedTask
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ================= GET TASKS =================

exports.getTasks = async (req, res) => {

  try {

    // ADMIN -> ALL TASKS
    // MEMBER -> ONLY ASSIGNED TASKS

    const query =
      req.user.role === "admin"
        ? {}
        : {
            assignedTo:
              req.user.id,
          };

    const tasks =
      await Task.find(query)
        .populate(
          "assignedTo",
          "name email"
        )
        .populate(
          "project",
          "title"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json(
      tasks
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ================= UPDATE TASK STATUS =================

exports.updateTaskStatus = async (
  req,
  res
) => {

  try {

    const { status } = req.body;

    // ===== VALID STATUS =====

    const validStatuses = [
      "pending",
      "in-progress",
      "completed",
    ];

    if (
      !validStatuses.includes(status)
    ) {

      return res.status(400).json({
        message:
          "Invalid task status",
      });

    }

    // ===== FIND TASK =====

    const task =
      await Task.findById(
        req.params.id
      );

    if (!task) {

      return res.status(404).json({
        message:
          "Task not found",
      });

    }

    // ===== MEMBER OWNERSHIP CHECK =====

    if (
      req.user.role !== "admin" &&
      task.assignedTo?.toString() !==
        req.user.id
    ) {

      return res.status(403).json({
        message:
          "You can only update your own tasks",
      });

    }

    // ===== UPDATE =====

    task.status = status;

    await task.save();

    const updatedTask =
      await Task.findById(task._id)
        .populate(
          "assignedTo",
          "name email"
        )
        .populate(
          "project",
          "title"
        );

    res.status(200).json(
      updatedTask
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ================= FULL TASK UPDATE =================
// ADMIN ONLY

exports.updateTask = async (req, res) => {

  try {

    const {
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      project,
      status,
    } = req.body;

    const task = await Task.findById(
      req.params.id
    );

    if (!task) {

      return res.status(404).json({
        message: "Task not found",
      });

    }

    // ===== UPDATE FIELDS =====

    task.title =
      title || task.title;

    task.description =
      description || task.description;

    task.priority =
      priority || task.priority;

    task.dueDate =
      dueDate || task.dueDate;

    task.assignedTo =
      assignedTo || task.assignedTo;

    task.project =
      project || task.project;

    task.status =
      status || task.status;

    // ===== RE-EVALUATE AI SCORE =====

    if (description) {

      const evaluation =
        evaluateTask(description);

      task.evaluationScore =
        evaluation.score;

      task.evaluationFeedback =
        evaluation.feedback;
    }

    await task.save();

    const updatedTask =
      await Task.findById(task._id)
        .populate(
          "assignedTo",
          "name email"
        )
        .populate(
          "project",
          "title"
        );

    res.status(200).json(
      updatedTask
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ================= DELETE TASK =================
// ADMIN ONLY

exports.deleteTask = async (
  req,
  res
) => {

  try {

    const task =
      await Task.findById(
        req.params.id
      );

    if (!task) {

      return res.status(404).json({
        message: "Task not found",
      });

    }

    await task.deleteOne();

    res.status(200).json({
      message:
        "Task deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};