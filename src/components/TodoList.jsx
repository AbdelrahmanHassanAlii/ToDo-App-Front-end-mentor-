import React, { useEffect, useState } from "react";
import "../css/todoList.css";
import "../js/todoList"



export default function TodoList() {


    const[todoList, setTodoList] = useState([]);
    useEffect(()=>{
        const storedTodoList = localStorage.getItem("todoList");
    if (storedTodoList) {
      setTodoList(JSON.parse(storedTodoList));
    }
    },[todoList])

  return (
    <div className="list">
 <ul>
        {todoList.map((todo, index) => (
            <div className="todo-card">
                <button className="button selected" ></button>
            <li key={index} className="todo">{todo}</li>
            </div>
          
        ))}
      </ul>
    </div>
  );
}