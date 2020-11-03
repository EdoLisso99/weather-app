import React, { useContext, useState } from "react";
import "./Navbar.css";
import { WeatherContext } from "./WeatherContext";
import cities from "cities.json";

/* Navbar displays the name of the chosen city, and provides a searchbar for searching other cities. */

function NavBar() {
  const { data, city } = useContext(WeatherContext);
  const [input, setInput] = useState("");
  const [jsonData, setJsonData] = data;
  const [cityName, setCityName] = city;
  const [suggestions, setSuggestions] = useState([]);

  //After the button is pressed or the form is submitted, the name of the chosen city is send at the state management
  const setCity = (event) => {
    event.preventDefault();
    setCityName(input.trim());
    setInput("");
    setSuggestions([]);
  };

  // Based on the characters typed in the searchbar, shows the suggestions, picked from the JSON database "cities"
  const onTextChanged = (e) => {
    let value = e.target.value;
    setInput(value);
    let unique = [];
    if (value.length >= 4) {
      value = value.toLowerCase();
      const regex = new RegExp([value]);
      for (let i = 0; i < cities.length; i++) {
        if (regex.test(cities[i]["name"].toLowerCase()))
          unique = [
            ...new Set([
              ...unique,
              `${cities[i]["name"]}, ${cities[i]["country"]}`,
            ]),
          ];
      }
    }
    setSuggestions(unique);
  };

  //When a suggestion is selected, set the input at the same value, and clear the suggestion array
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
            placeholder="Syntax: City, Country Code"
            onChange={(event) => onTextChanged(event)}
            onSubmit={setCity}
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
              {suggestions.map((country) => (
                <button
                  className="navbar__suggestionComponent"
                  key={country.toString()}
                  onClick={() => suggestionSelected(country)}
                >
                  {country}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
