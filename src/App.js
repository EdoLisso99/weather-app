import React from "react";
import "./App.css";
import Navbar from "./Navbar";
import Weather from "./Weather";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Weather />
    </div>
  );
}

export default App;
