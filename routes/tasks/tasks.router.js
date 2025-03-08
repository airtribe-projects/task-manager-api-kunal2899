const express = require("express");
const router = express.Router();

const { getAllTasks, addTask, updateTask, getTask, deleteTask } = require("../../db/dbController");
const { validateTaskBody } = require("./util");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Create a task
router.post("/", async (req, res) => {
  try {
    const taskToCreate = req.body;
    const validator = validateTaskBody(taskToCreate);
    if (!validator.isValid) {
      throw new Error(validator.reason);
    }
    await addTask(taskToCreate);
    res
      .status(201)
      .send({ message: "Task created successfully!", data: taskToCreate });
  } catch (error) {
    // While no errors are expected in this use case,
    // still it's good practice to wrap IO operations like
    // database queries to catch any unexpected errors
    console.error("Error in createTask --- ", error);
    res.status(400).send({ message: "Something went wrong!" });
  }
});

// Get all tasks
router.get("/", (req, res) => {
  try {
    const { completed = null, sortBy = null } = req.query;
    const filter = {};
    if (['true', 'false'].includes(completed)) {
      filter.completed = completed === 'true';
    }
    // Simulated DB call to get all tasks
    const tasksData = getAllTasks(filter, sortBy);
    res.status(200).send({ data: tasksData });
  } catch (error) {
    // While no errors are expected in this use case,
    // still it's good practice to wrap IO operations like
    // database queries to catch any unexpected errors
    console.error("Error in getAllTasks --- ", error);
    res.status(400).send({ message: "Something went wrong!" });
  }
});

// Get a task by id
router.get("/:id", (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    // Simulated DB call to get a single task by id
    const taskData = getTask(taskId);
    if (!taskData)
      return res.status(404).send({ message: "No such task found!" });
    res.status(200).send({ data: taskData });
  } catch (error) {
    // While no errors are expected in this use case,
    // still it's good practice to wrap IO operations like
    // database queries to catch any unexpected errors
    console.error("Error in getTaskById --- ", error);
    res.status(400).send({ message: "Something went wrong!" });
  }
});

// Get a task by id
router.get("/:id", (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    // Simulated DB call to get a single task by id
    const taskData = getTask(taskId);
    if (!taskData)
      return res.status(404).send({ message: "No such task found!" });
    res.status(200).send({ data: taskData });
  } catch (error) {
    // While no errors are expected in this use case,
    // still it's good practice to wrap IO operations like
    // database queries to catch any unexpected errors
    console.error("Error in getTaskById --- ", error);
    res.status(400).send({ message: "Something went wrong!" });
  }
});

// Get tasks by priority
router.get("/priority/:level", async (req, res) => {
  try {
    const { level: priorityLevel } = req.params;
    if (!['low', 'medium', 'high'].includes(priorityLevel)) {
      throw new Error(`Invalid request: '${priorityLevel}' is not a valid value!`)
    }
    const tasksData = getAllTasks({ priority: priorityLevel });
    res.status(200).send({ data: tasksData });
  } catch (error) {
    // While no errors are expected in this use case,
    // still it's good practice to wrap IO operations like
    // database queries to catch any unexpected errors
    console.error("Error in updateTask --- ", error);
    res.status(400).send({ message: "Something went wrong!" });
  }
});

// Update a task
router.put("/:id", async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const taskDataToUpdate = req.body;
    const existingTaskData = getTask(taskId);
    if (!existingTaskData)
      return res.status(404).send({ message: "No such task found!" });

    const validator = validateTaskBody(taskDataToUpdate, true);
    if (!validator.isValid) {
      throw new Error(validator.reason);
    }
    const taskToUpdate = { ...existingTaskData, ...taskDataToUpdate };
    await updateTask(taskToUpdate);
    res
      .status(200)
      .send({ message: "Task updated successfully!", data: taskToUpdate });
  } catch (error) {
    // While no errors are expected in this use case,
    // still it's good practice to wrap IO operations like
    // database queries to catch any unexpected errors
    console.error("Error in updateTask --- ", error);
    res.status(400).send({ message: "Something went wrong!" });
  }
});

// Delete a task
router.delete("/:id", async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const existingTaskData = getTask(taskId);
    if (!existingTaskData)
      return res.status(404).send({ message: "No such task found!" });
    await deleteTask(taskId);
    res
      .status(200)
      .send({ message: "Task deleted successfully!" });
  } catch (error) {
    // While no errors are expected in this use case,
    // still it's good practice to wrap IO operations like
    // database queries to catch any unexpected errors
    console.error("Error in deleteTask --- ", error);
    res.status(400).send({ message: "Something went wrong!" });
  }
});

module.exports = router;
