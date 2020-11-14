import React from "react";
import "./App.css";
import Navbar from "./Navbar";
import Weather from "./Weather";

function App() {
  return (
    <div className="app">
      <div className="app__background">
        {/* style={{
          backgroundImage: `url(${background})`,
        }} */}
        <Navbar />
        <Weather />
      </div>
    </div>
  );
}

export default App;
