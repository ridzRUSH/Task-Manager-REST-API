const mongoose = require("mongoose");
// const validator = require("validator");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true, required: true },
    body: { type: String },
    completed: { type: Boolean, default: false },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const task = mongoose.model("task", taskSchema);
module.exports = task;
