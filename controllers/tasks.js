const Task = require("../models/Task");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const { createCustomError } = require("../errors/custom-error");

const getAllTasks = asyncMiddleware(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const getTask = asyncMiddleware(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });

  if (!task) {
    //calling our custom error handling function that instantiates the customError class
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }

  res.status(200).json({ task });
});

const createTask = asyncMiddleware(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const updateTask = asyncMiddleware(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }

  res.status(200).json({ id: taskID, data: req.body });
});

const deleteTask = asyncMiddleware(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });

  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }

  res.status(200).send();
});

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
