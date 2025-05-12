import React from "react";
import { useState } from "react";
import axios from "axios";
import { PlusCircle } from "lucide-react";

function CreateTodo({ fetchData }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const titleVal = (e) => {
    setTitle(e.target.value);
  };

  const descVal = (e) => {
    setDescription(e.target.value);
  };

  async function putData() {
    await axios.post("http://localhost:3000/todo", {
      title: title,
      description: description,
    });
    fetchData();
  }
  return (
    <div className="w-full max-w-lg mx-auto mt-24 px-4">
      <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-indigo-600 mb-6 text-center">
          ✨ Create a New Task
        </h2>

        <div className="space-y-5">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={titleVal}
              placeholder="Enter task title"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={descVal}
              placeholder="Describe the task..."
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 resize-none"
            />
          </div>

          <button
            onClick={putData}
            disabled={!title || !description}
            className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-xl transition-all disabled:opacity-50"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateTodo;
