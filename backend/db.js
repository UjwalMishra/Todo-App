const mongoose = require("mongoose");

const todoAppSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  desciption: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
  },
});

const Todo = mongoose.model("Todo", todoAppSchema);

module.exports = { Todo };
