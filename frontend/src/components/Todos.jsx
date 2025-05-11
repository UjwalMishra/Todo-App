import axios from "axios";
import React from "react";

function Todos({ todos, addTodo, deleteTodo }) {
  return (
    <div>
      {todos.map((todo) => {
        return (
          <div key={todo._id}>
            <h1>{todo.title}</h1>
            <p>{todo.description}</p>
            <button onClick={() => addTodo(todo._id)}>
              {todo.completed ? "Already completed" : "Mark as completed"}
            </button>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default Todos;
