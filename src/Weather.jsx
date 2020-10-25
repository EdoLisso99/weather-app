import React, { useContext } from "react";
import "./Weather.css";
import OtherDays from "./OtherDays";
import { WeatherContext } from "./WeatherContext";

function Weather() {
  const [jsonData, setJsonData] = useContext(WeatherContext);

  function getDirectionFromDegree(angle) {
    const degreePerDirection = 360 / 8;
    const offsetAngle = angle + degreePerDirection / 2;
    return offsetAngle >= 0 * degreePerDirection &&
      offsetAngle < 1 * degreePerDirection
      ? "N"
      : offsetAngle >= 1 * degreePerDirection &&
        offsetAngle < 2 * degreePerDirection
      ? "N-E"
      : offsetAngle >= 2 * degreePerDirection &&
        offsetAngle < 3 * degreePerDirection
      ? "E"
      : offsetAngle >= 3 * degreePerDirection &&
        offsetAngle < 4 * degreePerDirection
      ? "S-E"
      : offsetAngle >= 4 * degreePerDirection &&
        offsetAngle < 5 * degreePerDirection
      ? "S"
      : offsetAngle >= 5 * degreePerDirection &&
        offsetAngle < 6 * degreePerDirection
      ? "S-W"
      : offsetAngle >= 6 * degreePerDirection &&
        offsetAngle < 7 * degreePerDirection
      ? "W"
      : "N-W";
  }

  function toDateTime(secs) {
    let t = new Date(1970, 0, 1);
    t.setSeconds(secs);
    return `${t.getHours()}:${t.getMinutes()}`;
  }

  return (
    <div className="weather">
      {/*Il tempo deve essere aggiornato ad ogni secondo */}
      <div className="weather__time">
        Time: {Date(jsonData.dt).slice(0, 21)}
      </div>
      <div className="weather__maxAndMin">
        Max:{Math.round((jsonData.main?.temp_max - 273.15) * 10) / 10}°C Min:
        {Math.round((jsonData.main?.temp_min - 273.15) * 10) / 10}°C
      </div>
      <div className="weather__info">
        <div className="weather__temperature">
          <div className="weather__celsius">
            {Math.round((jsonData.main?.temp - 273.15) * 10) / 10}°C
          </div>
          <div className="weather__perceivedTemperature">
            Perceived temperature:
            {Math.round((jsonData.main?.feels_like - 273.15) * 10) / 10}°C
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
            <p className="weather__windTitle">Wind</p>
            <div className="weather__windProp">
              <div className="weather__windSpeed">
                <p>Speed</p>
                <p>{jsonData.wind?.speed}[m/sec]</p>
              </div>
              <div className="weather__windDirection">
                <p>Direction</p>
                <p>{getDirectionFromDegree(jsonData.wind?.deg)}</p>
              </div>
              <div className="weather__windforce">
                <p>Force</p>
                <p>{jsonData.wind?.gust}[m/sec]</p>
              </div>
            </div>
          </div>
          <div className="weather__pressure">
            <p>Pressure</p>
            <p>{jsonData.main?.pressure}[hPa]</p>
          </div>
          <div className="weather__humidity">
            <p>Humidity</p>
            <p>{jsonData.main?.humidity}[%]</p>
          </div>
          <div className="weather__visibility">
            <p>Visibility</p>
            <p>{jsonData.visibility}[m]</p>
          </div>
          <div className="weather__clouds">
            <p>Cloudiness</p>
            <p>{jsonData.clouds?.all}[%]</p>
          </div>
          {/* Da sistemare sunset e sunrise! */}
          <div className="weather__sunset">
            <p>Sunset</p>
            <p>{toDateTime(jsonData.sys?.sunset)}</p>
          </div>
          <div className="weather__sunrise">
            <p>Sunrise</p>
            <p>{toDateTime(jsonData.sys?.sunrise)}</p>
          </div>
        </div>
      </div>
      <div className="weather__otherDays">
        <OtherDays />
        <OtherDays />
        <OtherDays />
        <OtherDays />
      </div>
    </div>
  );
}

export default Weather;
