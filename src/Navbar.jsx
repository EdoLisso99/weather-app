import React, { useContext, useState } from "react";
import "./Navbar.css";
import { WeatherContext } from "./WeatherContext";
import { FormControl, Button, Input, InputLabel } from "@material-ui/core";

function NavBar() {
  const [input, setInput] = useState("");
  const [jsonData, setJsonData] = useContext(WeatherContext);

  const setCity = (event) => {
    event.preventDefault();
    console.log("Inside setCity");
  };

  return (
    <div className="navbar">
      <div className="navbar__city">
        {jsonData.name}, <small>{jsonData.sys?.country}</small>
      </div>
      <form className="navbar__form">
        <input
          className="navbar__input"
          value={input}
          type="text"
          placeholder="Type a city or a country..."
          onSubmit={setCity}
          onChange={(event) => setInput(event.target.value)}
        />
        <button
          className="navbar__submitBtn"
          type="submit"
          onSubmit={setCity}
          disabled={!input}
          onClick={setCity}
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default NavBar;
