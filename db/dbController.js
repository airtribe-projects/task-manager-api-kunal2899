const fs = require("fs");
const { tasks: tasksData } = require("../task.json");
const { isEmpty, filter } = require("lodash");

const getAllTasks = (filterData = {}, sortBy = null) => {
  const finalTasksData = [...(isEmpty(filterData) ? tasksData : filter(tasksData, filterData))];
  if (sortBy && ['oldest', 'newest'].includes(sortBy)) {
    finalTasksData.sort((t1, t2) => {
      let task1 = t1, task2 = t2;
      if (sortBy === 'oldest') {
        task2 = t1;
        task1 = t2;
      }
      return new Date(task2.createdAt) - new Date(task1.createdAt)
    });
  }
  return finalTasksData;
};

const getTask = taskId => tasksData.find(task => task.id === taskId);

const addTask = async (taskToCreate) => {
  const updatedTasksData = [...tasksData];
  taskToCreate.id = tasksData.length + 1;
  taskToCreate.createdAt = new Date().toISOString();
  updatedTasksData.push(taskToCreate);
  await fs.promises.writeFile(
    "./task.json",
    JSON.stringify({ tasks: updatedTasksData }, null, 2),
    (err) => {
      if (err) throw new Error("Error in writing the file - ", err);
    }
  );
};

const updateTask = async (taskToUpdate) => {
  const { id: taskId } = taskToUpdate;
  const existingTaskData = getTask(taskId);
  if (!existingTaskData) throw new Error('No such task found to update!');
  Object.assign(existingTaskData, taskToUpdate);
  await fs.promises.writeFile(
    "./task.json",
    JSON.stringify({ tasks: tasksData }, null, 2),
    (err) => {
      if (err) throw new Error("Error in writing the file - ", err);
    }
  );
}

const deleteTask = async taskId => {
  const updatedTasksData = tasksData.filter(task => task.id !== taskId);
  await fs.promises.writeFile(
    "./task.json",
    JSON.stringify({ tasks: updatedTasksData }, null, 2),
    (err) => {
      if (err) throw new Error("Error in writing the file - ", err);
    }
  );
}

module.exports = {
  getAllTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
};
