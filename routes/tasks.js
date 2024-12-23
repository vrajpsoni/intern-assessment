const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// Get all tasks and render in a table
router.get("/", async (req, res) => {
 res.redirect('/tasks')
});


// Get all tasks and render in a table
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.findAll();
    console.log("All tasks:", tasks);
    res.render("view", { tasks });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve tasks" + error });
  }
});
//Design 
router.get("/add", async (req, res) => {
  res.render('add');
});

// Create a new task
router.post("/tasks", async (req, res) => {
  try {
    const newTask = await Task.create({
      title: req.body.txt1,

    });
    console.log("New task created:", newTask);
    res.redirect("/tasks");
  } catch (error) {
    console.error("Failed to create task:", error);
    res.status(500).json({ error: "Failed to create task " + error });
  }
});

// Delete a task by ID

router.get("/delete/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      await task.destroy();
      res.redirect("/tasks");
    } else {
      res.status(404).send("Task not found");
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" +error});
  }
});

// Get a single task by ID

router.get("/edit/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      res.render("edit", { task });
    } else {
      res.status(404).send("Task not found");
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve task" });
  }
});

// Update a task by ID
router.post("/update/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      task.title = req.body.txt1;
      task.status = req.body.txt2;
      await task.save();
      res.redirect(`/tasks/`);
    } else {
      res.status(404).send("Task not found");
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update task"+error });
  }
});

// Get all tasks by status
router.get("/taskstatus/:id", async (req, res) => {
  var id = req.params.id;
  console.log(id);
  try {
    const tasks = await Task.findAll({ where: { status: id }});
    //console.log("All tasks:", tasks);
    res.render("view", { tasks });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve tasks" + error });
  }
});
module.exports = router;
