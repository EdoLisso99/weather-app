import React, { useContext } from "react";
import "./Weather.css";
import OtherDays from "./OtherDays";
import { WeatherContext } from "./WeatherContext";

function Weather() {
  const { data } = useContext(WeatherContext);
  const [jsonData, setJsonData] = data;
  const index = [1, 2, 3, 4, 5, 6, 7];

  //From the degree returns the direction of the wind
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

  //Convert the date to the exact time
  function toDateTime(secs) {
    let t = new Date(1970, 0, 1);
    t.setSeconds(secs);
    let hours = t.getHours();
    let minutes = t.getMinutes();
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    return hours + ":" + minutes;
  }

  //Round the temperature with only two decimal figures
  function roundTemp(number) {
    let temp = Math.round((number - 273.15) * 10) / 10;
    return temp;
  }

  //From a date return the string, in this format: "dayOfTheWeek dayNumber month year hour:minutes"
  function toDateString(date) {
    let strDate = date.split(" ");
    let month;
    let day;
    switch (strDate[1]) {
      case "Jan":
        month = "January";
        break;
      case "Feb":
        month = "february";
        break;
      case "Mar":
        month = "March";
        break;
      case "Apr":
        month = "April";
        break;
      case "May":
        month = "May";
        break;
      case "Jun":
        month = "June";
        break;
      case "Jul":
        month = "July";
        break;
      case "Aug":
        month = "August";
        break;
      case "Sep" || "Sept":
        month = "September";
        break;
      case "Oct":
        month = "October";
        break;
      case "Nov":
        month = "November";
        break;
      case "Dec":
        month = "December";
        break;
      default:
        month = "January";
        break;
    }

    switch (strDate[0]) {
      case "Sun":
        day = "Sunday";
        break;
      case "Mon":
        day = "Monday";
        break;
      case "Tue" || "Tues":
        day = "Tuesday";
        break;
      case "Wed":
        day = "Wednesday";
        break;
      case "Thu" || "Thur" || "Thurs":
        day = "Thursday";
        break;
      case "Fri":
        day = "Friday";
        break;
      case "Sat":
        day = "Saturday";
        break;
      default:
        day = "Sunday";
        break;
    }
    return `${day} ${strDate[2]} ${month} ${strDate[3]} ${strDate[4]}`;
  }

  return (
    <div className="weather">
      <div className="weather__time">
        {toDateString(Date(jsonData.dt).slice(0, 21))}
      </div>
      <div className="weather__info">
        <div className="weather__temperature">
          <div className="weather__celsius">
            <div className="weather__currentTemperature">
              {roundTemp(jsonData.main?.temp)}°C
            </div>
            <div className="weather__perceivedTemperature">
              Perceived: {roundTemp(jsonData.main?.feels_like)} °C
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
        </div>

        <div className="weather__otherInfo">
          <div className="weather__wind">
            <div className="weather__windTitle">Wind</div>
            <div className="weather__windSpeed">
              <p>Speed</p>
              <p>{jsonData.wind?.speed}[m/s]</p>
            </div>
            <div className="weather__windDirection">
              <p>Direction</p>
              <p>{getDirectionFromDegree(jsonData.wind?.deg)}</p>
            </div>
          </div>
          <div className="weather__pressure">
            <div className="weather__pressureTitle">Pressure</div>
            <div className="weather__pressureData">
              {jsonData.main?.pressure}[hPa]
            </div>
          </div>
          <div className="weather__humidity">
            <div className="weather__humidityTitle">Humidity</div>
            <p className="weather__humidityData">
              {jsonData.main?.humidity}[%]
            </p>
          </div>

          <div className="weather__visibility">
            <div className="weather__visibilityTitle">Visibility</div>
            <p>{jsonData.visibility}[m]</p>
          </div>
          <div className="weather__cloudiness">
            <div className="weather__cloudinessTitle">Cloudiness</div>
            <p>{jsonData.clouds?.all}[%]</p>
          </div>
          <div className="weather__sunset">
            <div className="weather__sunsetTitle">Sunset</div>
            <p>{toDateTime(jsonData.sys?.sunset)}</p>
          </div>
          <div className="weather__sunrise">
            <div className="weather__sunriseTitle">Sunrise</div>
            <p>{toDateTime(jsonData.sys?.sunrise)}</p>
          </div>
        </div>
      </div>

      <div className="weather__otherDays">
        {index.map((id) => {
          return (
            <OtherDays
              key={id}
              id={id}
              lon={jsonData.coord?.lon}
              lat={jsonData.coord?.lat}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Weather;
