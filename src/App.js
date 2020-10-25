import React from "react";
import "./App.css";
import Navbar from "./Navbar";
import Weather from "./Weather";
import { WeatherProvider } from "./WeatherContext";
// - Your API key is fd2c86fbff118f10312f83b48138b8f8
function App() {
  return (
    <WeatherProvider>
      <div className="app">
        <Navbar />
        <Weather />
      </div>
    </WeatherProvider>
  );
}

export default App;
