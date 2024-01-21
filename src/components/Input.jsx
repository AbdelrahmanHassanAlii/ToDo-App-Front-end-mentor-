import React from "react";
import "../css/input.css";

export default function Input() {
  return (
    <div className="input-area">
          <input className="input" type="text" placeholder="Create a new todo..." />
          <button className="submmit-button " ></button>
    </div>
  );
}
