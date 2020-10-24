import React, { useEffect, useState } from "react";
import "./Weather.css";
import OtherDays from "./OtherDays";

function Weather() {
  const [jsonData, setJsonData] = useState({});
  //Se vedo che JsonData non sbugga posso sbarazzarmi benissimo di questo blocco sottostante
  const [dataDef, setDataDef] = useState({
    coord: { lon: 37.62, lat: 55.75 },
    weather: [
      { id: 803, main: "Clouds", description: "broken clouds", icon: "04d" },
    ],
    base: "stations",
    main: {
      temp: 284.43,
      feels_like: 279.66,
      temp_min: 283.15,
      temp_max: 286.15,
      pressure: 1008,
      humidity: 62,
    },
    visibility: 10000,
    wind: { speed: 5, deg: 250 },
    clouds: { all: 75 },
    dt: 1603543772,
    sys: {
      type: 1,
      id: 9029,
      country: "RU",
      sunrise: 1603513150,
      sunset: 1603548475,
    },
    timezone: 10800,
    id: 524901,
    name: "Moscow",
    cod: 200,
  });

  useEffect(() => {
    // Implementare un controllo affinchè non si digiti una città sbagliata!
    fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=Bergamo&appid=fd2c86fbff118f10312f83b48138b8f8"
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

  function getDirectionFromDegree(angle) {
    const degreePerDirection = 360 / 8;
    const offsetAngle = angle + degreePerDirection / 2;
    return offsetAngle >= 0 * degreePerDirection &&
      offsetAngle < 1 * degreePerDirection
      ? "North"
      : offsetAngle >= 1 * degreePerDirection &&
        offsetAngle < 2 * degreePerDirection
      ? "North-East"
      : offsetAngle >= 2 * degreePerDirection &&
        offsetAngle < 3 * degreePerDirection
      ? "East"
      : offsetAngle >= 3 * degreePerDirection &&
        offsetAngle < 4 * degreePerDirection
      ? "South-East"
      : offsetAngle >= 4 * degreePerDirection &&
        offsetAngle < 5 * degreePerDirection
      ? "South"
      : offsetAngle >= 5 * degreePerDirection &&
        offsetAngle < 6 * degreePerDirection
      ? "South-West"
      : offsetAngle >= 6 * degreePerDirection &&
        offsetAngle < 7 * degreePerDirection
      ? "West"
      : "North-West";
  }

  return (
    <div className="weather">
      {/*Il tempo deve essere aggiornato ad ogni secondo */}
      <p className="weather__time">Time: {Date(jsonData.dt).slice(0, 21)}</p>
      <p className="weather__maxAndMin">
        Max:{Math.round((jsonData.main?.temp_max - 273.15) * 10) / 10}°C Min:
        {Math.round((jsonData.main?.temp_min - 273.15) * 10) / 10}°C
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
            src={`http://openweathermap.org/img/wn/${jsonData.weather?.[0].icon}@2x.png`}
            alt="Weather Icon"
          />
          <p className="weather__iconDescription">
            {(
              jsonData.weather?.[0].description.charAt(0).toUpperCase() +
              jsonData.weather?.[0].description.slice(1)
            ).toString()}
          </p>
        </div>
        {/* Lo devo rendere una tabella! */}
        <div className="weather__otherInfo">
          <div className="weather__wind">
            Wind Speed {jsonData.wind?.speed} [m/sec]
          </div>
          <div className="weather__windDirection">
            Wind direction: {getDirectionFromDegree(jsonData.wind?.deg)}
          </div>
          <div className="weather__windDirection">
            Wind force {jsonData.wind?.gust} [m/sec]
          </div>
          <div className="weather__pressure">
            Pressure {jsonData.main?.pressure} [hPa]
          </div>
          <div className="weather__humidity">
            Humidity
            {jsonData.main?.humidity} [%]
          </div>
          <div className="weather__visibility">
            Visibility {jsonData.visibility} [m]
          </div>
          <div className="weather__clouds">
            Cloudiness {jsonData.clouds?.all} [%]
          </div>
          {/* Da sistemare sunset e sunrise! */}
          <div className="weather__sunset">
            Sunset {Date(jsonData.sys?.sunset)}
          </div>
          <div className="weather__sunrise">
            Sunrise {Date(jsonData.sys?.sunrise)}
          </div>
        </div>
      </div>
      <OtherDays />
    </div>
  );
}

export default Weather;
