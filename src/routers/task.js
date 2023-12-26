const express = require("express");
const Task = require("../modals/task");
const auth = require("../middleware/auth");
const task = require("../modals/task");
const router = new express.Router();

router.post("/tasks", auth, async (req, res) => {
  // const task = new Task(req.body);
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send();
  }
});
// GET /task compleated
// GET /task?limit=10 & skip=0
router.get("/tasks", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user._id });
    // const tasks = await req.user
    //   .populate({
    //     path: "tasks",
    //     match: {
    //       completed: false,
    //     },
    //   })
    //   .execPopulate();

    res.send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    // const task = await Task.findById(_id);
    const task = await task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(400).send(".");
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdate = ["title", "body"];
  const isValidOperation = updates.every((update) =>
    allowedUpdate.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: " invalid field update" });
  }
  try {
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!user) {
      return res.status(404).send();
    }

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(400).send();
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(400).send({ error: " oops! cant able to find" });
    }

    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
