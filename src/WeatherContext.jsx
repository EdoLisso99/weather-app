import React, { useEffect, useState, createContext } from "react";

export const WeatherContext = createContext();

export const WeatherProvider = (props) => {
  const [jsonData, setJsonData] = useState({});
  const [cityName, setCityName] = useState("");
  const [dataDef, setDataDef] = useState({
    coord: { lon: 9.39, lat: 45.85 },
    weather: [
      { id: 803, main: "Clouds", description: "broken clouds", icon: "04n" },
    ],
    base: "stations",
    main: {
      temp: 287.24,
      feels_like: 287.02,
      temp_min: 285.93,
      temp_max: 288.15,
      pressure: 1013,
      humidity: 83,
    },
    visibility: 10000,
    wind: { speed: 0.88, deg: 213 },
    clouds: { all: 79 },
    dt: 1603644312,
    sys: {
      type: 3,
      id: 2007696,
      country: "IT",
      sunrise: 1603605181,
      sunset: 1603642780,
    },
    timezone: 3600,
    id: 6541997,
    name: "Lecco",
    cod: 200,
  });

  useEffect(() => {
    // Implementare un controllo affinchè non si digiti una città sbagliata!
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${
        cityName.length === 0 ? "Lecco" : cityName
      }&appid=fd2c86fbff118f10312f83b48138b8f8`
    )
      .then((response) => response.json())
      .then(
        (result) => {
          if (result.cod === "404" || result.message === "city not found") {
            alert(
              "Error! The chosen city has an invalid name or country.\nPlease use ISO 3166 country codes.\nThe weather will be shown in the default location"
            );
            setJsonData(dataDef);
          } else {
            setJsonData(result);
          }
        },
        (error) => {
          console.log("Si è verificato un errore!");
          setJsonData(dataDef);
        }
      );
  }, [cityName]);

  return (
    <WeatherContext.Provider
      value={{ data: [jsonData, setJsonData], city: [cityName, setCityName] }}
    >
      {props.children}
    </WeatherContext.Provider>
  );
};
