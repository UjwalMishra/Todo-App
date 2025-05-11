import axios from "axios";
import React from "react";

function Todos({ todos, btnHandler }) {
  return (
    <div>
      {todos.map((todo) => {
        return (
          <div key={todo._id}>
            <h1>{todo.title}</h1>
            <p>{todo.description}</p>
            <button onClick={() => btnHandler(todo._id)}>
              {todo.completed ? "Already completed" : "Mark as completed"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Todos;
