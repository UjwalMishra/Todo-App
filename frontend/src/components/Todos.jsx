import React from "react";

function Todos({ todos, addTodo, deleteTodo }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        Todo List
      </h1>
      {todos.length === 0 ? (
        <p className="text-center text-gray-500">No todos available.</p>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {todos.map((todo) => (
            <div
              key={todo._id}
              className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {todo.title}
              </h2>
              <p className="text-gray-600 mb-4">{todo.description}</p>
              <div className="flex gap-4">
                <button
                  onClick={() => addTodo(todo._id)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
                    todo.completed
                      ? "bg-green-100 text-green-700 cursor-not-allowed"
                      : "bg-indigo-500 hover:bg-indigo-600 text-white"
                  }`}
                  disabled={todo.completed}
                >
                  {todo.completed ? "Already completed" : "Mark as completed"}
                </button>
                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="px-4 py-2 rounded-lg font-medium text-sm bg-red-500 hover:bg-red-600 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Todos;
