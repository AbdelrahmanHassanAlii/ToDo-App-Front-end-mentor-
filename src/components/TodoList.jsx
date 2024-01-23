import React, { useEffect, useState } from "react";
import "../css/todoList.css";

export default function TodoList() {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const storedTodoList = localStorage.getItem("todoList");
    if (storedTodoList) {
      setTodoList(JSON.parse(storedTodoList));
    } else {
      setTodoList([]);
    }
  }, [todoList]);

  const handleButtonClick = (e) => {
    const updatedTodoList = [...todoList];
    let index = parseInt(e.target.id);

    // Check if the index is valid
    if (index >= 0 && index < updatedTodoList.length) {
      updatedTodoList[index].status =
        updatedTodoList[index].status === "pending" ? "completed" : "pending";

      localStorage.setItem("todoList", JSON.stringify(updatedTodoList));
      setTodoList(updatedTodoList);
    }
  };

  return (
    <div className="list">
      <ul>
        {todoList.map((todo, index) => (
          <div className="todo-card">
            <button
              id={index}
              className={`button ${
                todo.status === "completed" ? "finished" : ""
              }`}
              onClick={handleButtonClick}
            >
              {todo.status === "completed" ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
                  <path
                    fill="none"
                    stroke="#FFF"
                    stroke-width="2"
                    d="M1 4.304L3.696 7l6-6"
                  />
                </svg>
              ) : (
                ""
              )}
            </button>
            <li key={index} className="todo">
              {todo.text}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}
