import React, { useContext, useState } from "react";
import "./Navbar.css";
import { WeatherContext } from "./WeatherContext";
import Countries from "./Countries";
import cities from "cities.json";

function NavBar() {
  const { data, city } = useContext(WeatherContext);
  const [input, setInput] = useState("");
  const [jsonData, setJsonData] = data;
  const [cityName, setCityName] = city;
  const [suggestions, setSuggestions] = useState([]);

  const setCity = (event) => {
    let citta = input.trim().split(",")[0];
    if (citta.length === null) console.log("ERRORE DIOCANE");
    event.preventDefault();
    setCityName(input.trim().split(",")[0]);
    setInput("");
    setSuggestions([]);
  };

  const onTextChanged = (e) => {
    let value = e.target.value;
    setInput(value);
    let newSuggestions = [];
    if (value.length >= 5) {
      value = value.toLowerCase();
      const regex = new RegExp([value]);
      for (let i = 0; i < cities.length; i++) {
        if (regex.test(cities[i]["name"].toLowerCase()))
          newSuggestions = [
            ...newSuggestions,
            `${cities[i]["name"]}, ${cities[i]["country"]}`,
          ];
      }
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
