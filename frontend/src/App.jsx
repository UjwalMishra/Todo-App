import { useState } from "react";
import "./App.css";
import CreateTodo from "./components/CreateTodo";
import Todos from "./components/Todos";
import { useEffect } from "react";
import axios from "axios";
function App() {
  const [todos, setTodos] = useState([]);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:3000/todos");
    setTodos(res.data.todos);
    // console.log(res.data.todos);
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function addTodo(id) {
    await axios.put("http://localhost:3000/completed", {
      id,
    });
    fetchData();
  }

  async function deleteTodo(id) {
    await axios.delete("http://localhost:3000/delete", {
      data: { id },
    });
    fetchData();
  }
  return (
    <>
      <div>
        <CreateTodo fetchData={fetchData} />
        <Todos todos={todos} addTodo={addTodo} deleteTodo={deleteTodo} />
      </div>
    </>
  );
}

export default App;
