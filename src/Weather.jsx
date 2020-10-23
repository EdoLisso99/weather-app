import React, { useEffect, useState } from "react";
import "./Weather.css";
import OtherDays from "./OtherDays";

function Weather() {
  const [jsonData, setJsonData] = useState({});
  //Se vedo che JsonData non sbugga posso sbarazzarmi benissimo di questo blocco sottostante
  const [dataDef, setDataDef] = useState({
    coord: {
      lon: -122.08,
      lat: 37.39,
    },
    weather: [
      {
        id: 800,
        main: "Clear",
        description: "clear sky",
        icon: "01d",
      },
    ],
    base: "stations",
    main: {
      temp: 282.55,
      feels_like: 281.86,
      temp_min: 280.37,
      temp_max: 284.26,
      pressure: 1023,
      humidity: 100,
    },
    visibility: 16093,
    wind: {
      speed: 1.5,
      deg: 350,
    },
    clouds: {
      all: 1,
    },
    dt: 1560350645,
    sys: {
      type: 1,
      id: 5122,
      message: 0.0139,
      country: "US",
      sunrise: 1560343627,
      sunset: 1560396563,
    },
    timezone: -25200,
    id: 420006353,
    name: "Mountain View",
    cod: 200,
  });

  useEffect(() => {
    fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=Lecco&appid=fd2c86fbff118f10312f83b48138b8f8"
    )
      .then((response) => response.json())
      .then(
        (result) => {
          setJsonData(result);
        },
        (error) => {
          console.log("Si è verificato un errore!");
          setJsonData(dataDef);
        }
      );
  }, []);

  function setIcon(id) {
    return "http://openweathermap.org/img/wn/01d@2x.png";
  }

  return (
    <div className="weather">
      <p className="weather__time">Time: 22 October 2020</p>
      <p className="weather__maxAndMin">
        Max:{Math.round((jsonData.main?.temp_max - 273.15) * 10) / 10}° Min:
        {Math.round((jsonData.main?.temp_min - 273.15) * 10) / 10}°
      </p>
      <div className="weather__info">
        <div className="weather__temperature">
          <div className="weather__celsius">
            {Math.round((jsonData.main?.temp - 273.15) * 10) / 10}°
          </div>
          <div className="weather__perceivedTemperature">
            Perceived temperature:
            {Math.round((jsonData.main?.feels_like - 273.15) * 10) / 10}°
          </div>
        </div>
        <div className="weather__icon">
          <img
            className="weather__image"
            src={setIcon(jsonData.weather?.id)}
            alt="Weather Icon"
          />
          <p className="weather__iconDescription">
            {(
              jsonData.weather?.[0].description.charAt(0).toUpperCase() +
              jsonData.weather?.[0].description.slice(1)
            ).toString()}
          </p>
        </div>
        <div className="weather__otherInfo">
          <div className="weather__humidity">
            Humidity: {jsonData.main?.pressure}
          </div>
          <div className="weather__wind">Wind Speed {jsonData.wind?.speed}</div>
          <div className="weather__windDirection">
            Wind direction: {jsonData.wind?.deg}
          </div>
          <div className="weather__pressure">
            Pressure {jsonData.main?.pressure}
          </div>
          <div className="weather__humidity">
            Humidity {jsonData.main?.humidity}
          </div>
          <div className="weather__visibility">
            Visibility {jsonData.visibility}
          </div>
          <div className="weather__clouds">Clouds {jsonData.clouds?.all}</div>
          <div className="weather__sunset">Sunset {jsonData.sys?.sunset}</div>
          <div className="weather__sunrise">
            Sunrise {jsonData.sys?.sunrise}
          </div>
        </div>
      </div>
      <OtherDays />
    </div>
  );
}

export default Weather;
