import { useState } from "react";
import "./App.css";
import CreateTodo from "./components/CreateTodo";
import Todos from "./components/Todos";
import { useEffect } from "react";
import axios from "axios";
function App() {
  const fetchData = async () => {
    const res = await axios.get("http://localhost:3000/todos");
    setTodos(res.data.todos);
    console.log(res.data.todos);
  };
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  async function btnHandler(id) {
    console.log("id : ", id);
    const data = await axios.put("http://localhost:3000/completed", {
      id,
    });
    fetchData();
    console.log(data.data);
  }
  return (
    <>
      <div>
        <CreateTodo fetchData={fetchData} />
        <Todos todos={todos} btnHandler={btnHandler} />
      </div>
    </>
  );
}

export default App;
