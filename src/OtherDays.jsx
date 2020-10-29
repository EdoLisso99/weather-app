import React, { useContext, useEffect, useState } from "react";
import "./OtherDays.css";
import { WeatherContext } from "./WeatherContext";

function OtherDays({ id, lon, lat }) {
  const { city } = useContext(WeatherContext);
  const [dayData, setDayData] = useState({});
  const [cityName, setCityName] = city;

  const arrayDay = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${
        lat === "" || lat === undefined ? 45.85 : lat
      }&lon=${
        lon === "" || lon === undefined ? 9.39 : lon
      }&exclude=current,minutely,hourly&appid=fd2c86fbff118f10312f83b48138b8f8`
    )
      .then((response) => response.json())
      .then(
        (result) => {
          if (result.cod === "404" || result.message === "city not found") {
            alert(
              "Error! The chosen city has an invalid name or country.\nPlease use ISO 3166 country codes.\nThe weather will be shown in the default location"
            );
            setCityName("Lecco");
          } else {
            setDayData(result);
          }
        },
        (error) => {
          console.log("An error has occurred!");
          setCityName("Lecco");
        }
      );
  }, [lat, lon]);

  function calculateDay() {
    let today = new Date();
    today = today.getDay() + id - 1;
    return arrayDay[today % 7];
  }

  function roundTemp(number) {
    let temp = Math.round((number - 273.15) * 10) / 10;
    return temp;
  }

  return (
    <div className="otherDays">
      <div className="otherDays__shortInfo">
        <div className="otherDays__day">{calculateDay()}</div>
        <div className="otherDays__icon">
          <img
            className="weather__image"
            src={`http://openweathermap.org/img/wn/${dayData.daily?.[id].weather?.[0].icon}@2x.png`}
            alt="Weather Icon"
          />
        </div>
        <div className="otherDays__maxAndMin">
          <div className="otherDays__max">
            {roundTemp(dayData.daily?.[id].temp.max)}°C
          </div>
          <div className="otherDays__min">
            {roundTemp(dayData.daily?.[id].temp.min)}°C
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtherDays;
