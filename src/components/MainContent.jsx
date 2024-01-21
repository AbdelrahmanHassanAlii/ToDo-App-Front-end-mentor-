import React from "react";
import "../css/mainContent.css";
import Header from "./Header";
import Input from "./Input";

export default function MainContent() {
  return (
    <div className="main-content">
      <Header />
      <Input />
    </div>
  );
}
