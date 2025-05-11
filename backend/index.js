const express = require("express");
const app = express();

//imports
const { createTodo, updateTodo } = require("./types");
const { dbConnect } = require("./config/dbConnect");
const { Todo } = require("./db");
const cors = require("cors");

const PORT = 3000;

// db connection
dbConnect();

//middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

//routes
app.get("/todos", async (req, res) => {
  const allTodos = await Todo.find({});
  return res.status(200).json({
    success: true,
    msg: "Todos fetched successfully",
    todos: allTodos,
  });
});

app.post("/todo", async (req, res) => {
  const inputPayload = req.body;
  const validatedPayload = createTodo.safeParse(inputPayload);
  if (!validatedPayload.success) {
    return res.status(411).json({
      msg: "You have sent the wrong input",
      success: false,
    });
  }

  //everything good --> put it in db
  const todo = await Todo.create({
    title: inputPayload.title,
    description: inputPayload.description,
    completed: false,
  });
  return res.status(200).json({
    success: true,
    msg: "Todo created successfully",
    todo: todo,
  });
});

app.put("/completed", async (req, res) => {
  const payload = req.body;
  const validatedPayload = updateTodo.safeParse(payload);

  if (!validatedPayload.success) {
    return res.status(411).json({
      msg: "You have sent the wrong input",
      success: false,
    });
  }

  try {
    // Step 1: Find the existing todo
    const todo = await Todo.findById(payload.id);
    if (!todo) {
      return res.status(404).json({ msg: "Todo not found", success: false });
    }

    // Step 2: Toggle the completed value
    const updatedTodo = await Todo.findByIdAndUpdate(
      payload.id,
      { completed: !todo.completed },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      UpdatedTodo: updatedTodo,
    });
  } catch (err) {
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
});

//delete route
app.delete("/delete", async (req, res) => {
  const payload = req.body;
  const validatedPayload = updateTodo.safeParse(payload);

  if (!validatedPayload.success) {
    return res.status(411).json({
      msg: "You have sent the wrong input",
      success: false,
    });
  }
  //find and delete
  try {
    await Todo.findByIdAndDelete({ _id: payload.id });
    return res.status(200).json({
      success: true,
      msg: "todo deleted successfully",
    });
  } catch (err) {
    console.log("Error while deleting todo ", err);
  }
});

//default route
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT || 3000, () => {
  console.log("Server is running on port " + PORT);
});
