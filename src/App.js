import React from "react";
import "./App.css";
import Navbar from "./Navbar";
import Weather from "./Weather";
// - Your API key is fd2c86fbff118f10312f83b48138b8f8
function App() {
  return (
    <div className="app">
      <Navbar />
      <Weather />
    </div>
  );
}

export default App;
