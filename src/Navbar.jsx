import React, { useContext, useState } from "react";
import "./Navbar.css";
import { WeatherContext } from "./WeatherContext";
import Countries from "./Countries";
import Information from "./Information-json";

function NavBar() {
  const [input, setInput] = useState("");
  const [jsonData, setJsonData] = useContext(WeatherContext);
  const [suggestions, setSuggestions] = useState([]);

  const setCity = (event) => {
    event.preventDefault();
    console.log("Inside setCity");
  };

  const onTextChanged = (e) => {
    const value = e.target.value;
    setInput(value);
    let newSuggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      newSuggestions = Information.Afghanistan.sort().filter((v) =>
        regex.test(v)
      );
    }
    setSuggestions(newSuggestions);
  };

  const suggestionSelected = (value) => {
    setInput(value);
    setSuggestions([]);
  };

  return (
    <div className="navbar">
      <div className="navbar__city">
        {jsonData.name}, <small>{jsonData.sys?.country}</small>
      </div>
      <div className="navbar__searchbar">
        <form className="navbar__form">
          <input
            className="navbar__input"
            value={input}
            type="text"
            placeholder="Type a city or a country..."
            onChange={(event) => onTextChanged(event)}
          />
          <button
            className="navbar__submitBtn"
            type="submit"
            disabled={!input}
            onClick={setCity}
          >
            Search
          </button>
        </form>
        <div className="navbar__suggestions">
          {suggestions.length === 0 ? null : (
            <div className="navbar__country">
              {/* Cambio passandogli non Afghanistan ma solo gli elementi filtrati. Da sistemare il Json assolutamente */}
              {suggestions.map((country) => (
                // <Countries country={country} />
                <p
                  className="navbar__suggestionComponent"
                  key={country.toString()}
                  onClick={() => suggestionSelected(country)}
                >
                  {country}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
