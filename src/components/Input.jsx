import React, { useState } from "react";
import "../css/input.css";



export default function Input() {
  const [newTodo, setNewTodo] = useState('');

  let addToLocal = () => {
    // console.log("Submitted");
    let todoText = newTodo.trim();
    // console.log(todoText);
    if (todoText !== '') {
      // Get the current todoList from local storage
      const todoListString = localStorage.getItem('todoList');
      const todoList = JSON.parse(todoListString) || [];

      // Update the todoList with the new todo
      todoList.push(todoText);

      // Save the updated todoList to local storage
      localStorage.setItem('todoList', JSON.stringify(todoList));

      // Clear the input field
      setNewTodo('');
    }
  };

  return (
    <div className="input-area">
      <input className="input" type="text" placeholder="Create a new todo..." value={newTodo} onChange={(e)=>setNewTodo(e.target.value)}/>
      <button className="submmit-button" onClick={addToLocal}></button>
    </div>
  );
}
