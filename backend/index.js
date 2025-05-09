const express = require("express");
const app = express();

//imports
const { createTodo, updateTodo } = require("./types");
const { dbConnect } = require("./config/dbConnect");
const { Todo } = require("./db");
const PORT = 3000;

// db connection
dbConnect();

//middlewares
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
  const updatedDataPayload = req.body;
  const validatedPayload = updateTodo.safeParse(updatedDataPayload);
  if (!validatedPayload.success) {
    return res.status(411).json({
      msg: "You have sent the wrong input",
      success: false,
    });
  }
  const _id = req.headers.id;
  //everything is good --> update todo in db
  const updatedTodo = await Todo.findOneAndUpdate(
    { _id },
    {
      completed: true,
    },
    { new: true }
  );

  return res.status(200).json({
    success: true,
    UpdatedTodo: updatedTodo,
  });
});

//default route
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT || 3000, () => {
  console.log("Server is running on port " + PORT);
});
