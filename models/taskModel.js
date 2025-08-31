// In-memory storage (later can be replaced with DB)
let tasks = [];
let currentId = 1;

function getAllTasks() {
  return tasks;
}

function addTask(title, description) {
  const task = {
    id: currentId++,
    title: title.trim(),
    description: description.trim(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  return task;
}

function updateTask(id, updatedData) {
  const taskIndex = tasks.findIndex((t) => t.id === id);
  if (taskIndex === -1) return null;

  const task = tasks[taskIndex];
  if (updatedData.title !== undefined) task.title = updatedData.title.trim();
  if (updatedData.description !== undefined)
    task.description = updatedData.description.trim();
  if (updatedData.status !== undefined) task.status = updatedData.status;

  tasks[taskIndex] = task;
  return task;
}

function deleteTask(id) {
  const taskIndex = tasks.findIndex((t) => t.id === id);
  if (taskIndex === -1) return null; // not found
  const deletedTask = tasks[taskIndex];

  tasks.splice(taskIndex, 1); // remove from array
  return deletedTask; // return the deleted object
}

module.exports = {
  getAllTasks,
  addTask,
  updateTask,
  deleteTask,
};
