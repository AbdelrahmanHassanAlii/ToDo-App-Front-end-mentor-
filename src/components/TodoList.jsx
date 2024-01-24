import React, { useEffect, useState } from "react";
import "../css/todoList.css";

export default function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const [counter, setCounter] = useState(0);

  //get all the tasks that in local storage
  useEffect(() => {
    const storedTodoList = localStorage.getItem("todoList");
    if (storedTodoList) {
      const parsedTodoList = JSON.parse(storedTodoList);
      setTodoList(parsedTodoList);

      // Count the number of un-completed todos
      const unCompletedCount = parsedTodoList.filter(
        (todo) => todo.status === "pending"
      ).length;

      // Update the counter
      setCounter(unCompletedCount);
    } else {
      setTodoList([]);
      setCounter(0); // Reset the counter when there's no storedTodoList
    }
  }, [counter, todoList]);

  //handle on click to finish todo activites
  const handleButtonClick = (e) => {
    const updatedTodoList = [...todoList];
    let index = parseInt(e.target.id);

    // Check if the index is valid
    if (index >= 0 && index < updatedTodoList.length) {
      updatedTodoList[index].status =
        updatedTodoList[index].status === "pending" ? "completed" : "pending";

      localStorage.setItem("todoList", JSON.stringify(updatedTodoList));
      setTodoList(updatedTodoList);

      console.log(e.target.parentNode);
    }
  };

  //function handle clear just completed todo
  const handleClearCompleted = () => {
    const updatedTodoList = todoList.filter(
      (todo) => todo.status === "pending"
    );
    localStorage.setItem("todoList", JSON.stringify(updatedTodoList));
    setTodoList(updatedTodoList);
    setCounter(updatedTodoList.length);
  };

  //function to show All TODO
  const showAll = () => {
    const all = localStorage.getItem("todoList");
    if (all) {
      const parsedAll = JSON.parse(all);
      setTodoList(parsedAll);
    }
  };

  // function to show only  Completed TODO
  const showCompleted = () => {
    const storedTodoList = localStorage.getItem("todoList");
    if (storedTodoList) {
      const parsedTodoList = JSON.parse(storedTodoList);
      const completedTodoList = parsedTodoList.filter(
        (todo) => todo.status === "completed"
      );
      setTodoList(completedTodoList);
    }
  };

  // function to show only not Completed TODO
  const showActivated = () => {
    const storedTodoList = localStorage.getItem("todoList");
    if (storedTodoList) {
      const parsedTodoList = JSON.parse(storedTodoList);
      const unCompletedTodoList = parsedTodoList.filter(
        (todo) => todo.status === "pending"
      );
      setTodoList(unCompletedTodoList);
    }
  };

  return (
    <div className="list">
      <ul>
        {todoList.map((todo, index) => (
          <div
            className={`todo-card ${
              todo.status === "completed" ? "finished" : ""
            }`}
          >
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
      <div className="footer">
        <div className="left">
          <p>{counter} items left</p>
        </div>
        <div className="middle">
          <p onClick={showAll}>All</p>
          <p onClick={showActivated}>Active</p>
          <p onClick={showCompleted}>Completed</p>
        </div>
        <div className="right">
          <p onClick={handleClearCompleted}>Clear Completed</p>
        </div>
      </div>
    </div>
  );
}
