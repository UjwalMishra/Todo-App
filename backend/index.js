const express = require("express");
const app = express();

//imports
const { createTodo, updateTodo } = require("./types");
const PORT = 3000;

//middlewares
app.use(express.json());

//routes
app.get("/todos", (req, res) => {
  const inputPayload = req.body;
  const validatedPayload = createTodo.safeParse(inputPayload);
  if (!validatedPayload.success) {
    return res.status(411).json({
      msg: "You have sent the wrong input",
      success: false,
    });
  }

  //everything good --> put it in db
});

app.post("/todo", (req, res) => {});

app.put("/cpmpleted", (req, res) => {
  const updatedDataPayload = req.body;
  const validatedPayload = updateTodo.safeParse(updatedDataPayload);
  if (!validatedPayload.success) {
    return res.status(411).json({
      msg: "You have sent the wrong input",
      success: false,
    });
  }

  //everything is good --> update todo in db
});

//default route
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT || 3000, () => {
  console.log("Server is running on port " + PORT);
});
