import React from "react";
import { useState } from "react";
import axios from "axios";

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
    <div>
      <input
        type="text"
        style={{
          padding: 5,
          margin: 5,
          borderRadius: 5,
        }}
        value={title}
        onChange={titleVal}
        placeholder="Enter Title"
      />
      <br />
      <input
        type="text"
        style={{
          padding: 5,
          margin: 5,
          borderRadius: 5,
        }}
        value={description}
        onChange={descVal}
        placeholder="Enter Description"
      />{" "}
      <br />
      <button
        style={{
          padding: 5,
          margin: 5,
          borderRadius: 5,
        }}
        onClick={putData}
      >
        Add Todo
      </button>
    </div>
  );
}

export default CreateTodo;
