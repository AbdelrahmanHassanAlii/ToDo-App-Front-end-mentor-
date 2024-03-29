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

  //handle click on cross
  const del = (index) => {
    let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
    todoList.splice(index, 1);
    localStorage.setItem("todoList", JSON.stringify(todoList));
  };

  // fuction to control the color of the middle section
  const updateMiddleTextColor = (color) => {
    let middleColor = document.querySelectorAll(".control");

    //for light-mood
    if (document.body.classList.contains("light-mode")) {
      middleColor.forEach((p) => {
        p.style.color = "var(--dark-grayish-blue)";
      });
    }

    //for dark-mood
    middleColor.forEach((p) => {
      p.style.color = color;
    });
  };

  //function to show All TODO
  const showAll = (e) => {
    let todos = document.querySelectorAll(".todo-card");
    todos.forEach((todo) => {
      todo.style.display = "block";
    });
    updateMiddleTextColor("var(--light-grayish-blue-dark)");
    e.target.style.color = "var(--bright-blue)";
  };

  // function to show only  Completed TODO
  const showCompleted = (e) => {
    showAll(e);
    let todosNotFinished = document.querySelectorAll(
      ".todo-card:not(.finished)"
    );
    todosNotFinished.forEach((todo) => {
      todo.style.display = "none";
    });
  };

  // function to show only not Completed TODO
  const showActivated = (e) => {
    showAll(e);
    let todosFinished = document.querySelectorAll(".todo-card.finished");
    todosFinished.forEach((todo) => {
      todo.style.display = "none";
    });
  };

  return (
    <>
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
              <div className="cross" id={index} onClick={() => del(index)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                  <path
                    fill="#494C6B"
                    fill-rule="evenodd"
                    d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
                  />
                </svg>
              </div>
            </div>
          ))}
        </ul>
        {localStorage.getItem("todoList") &&
        localStorage.getItem("todoList").length - 2 > 0 ? (
          <div className="footer">
            <div className="left">
              <p>{counter} items left</p>
            </div>
            <div className="middle">
              <p onClick={showAll} className="control">
                All
              </p>
              <p onClick={showActivated} className="control">
                Active
              </p>
              <p onClick={showCompleted} className="control">
                Completed
              </p>
            </div>
            <div className="right">
              <p onClick={handleClearCompleted}>Clear Completed</p>
            </div>
          </div>
        ) : (
          <h4 className="text-center p-2"> add some thing todo </h4>
        )}
      </div>

      {localStorage.getItem("todoList") &&
      localStorage.getItem("todoList").length - 2 > 0 ? (
        <div className="middle-mobile">
          <p onClick={showAll} className="control">
            All
          </p>
          <p onClick={showActivated} className="control">
            Active
          </p>
          <p onClick={showCompleted} className="control">
            Completed
          </p>
        </div>
      ) : null}
    </>
  );
}
