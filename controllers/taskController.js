const Task = require("../models/taskModel");

// GET all tasks
exports.getTasks = (req, res) => {
  res.json(Task.getAllTasks());
};

// POST create task
exports.createTask = (req, res) => {
  const { title, description } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ error: "Title is required" });
  }
  if (!description || !description.trim()) {
    return res.status(400).json({ error: "Description is required" });
  }

  const task = Task.addTask(title, description);
  res.status(201).json(task);
};

// PUT update task
exports.updateTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, description, status } = req.body;

  if (status && !["pending", "in-progress", "completed"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  const task = Task.updateTask(taskId, { title, description, status });

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
};

exports.deleteTask = (req, res) => {
  const taskId = parseInt(req.params.id);

  const deleted = Task.deleteTask(taskId);

  if (!deleted) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json({ message: "Task deleted successfully", task: deleted });
};
