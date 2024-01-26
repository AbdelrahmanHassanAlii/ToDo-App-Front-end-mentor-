import React from "react";
import "../css/mainContent.css";
import Header from "./Header";
import Input from "./Input";
import TodoList from "./TodoList";

import "../css/lightMood.css";

export default function MainContent() {
  return (
    <div className="main-content">
      <Header />
      <Input />
      <TodoList />
    </div>
  );
}
