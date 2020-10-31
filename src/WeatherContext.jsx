import React, { useEffect, useState, createContext } from "react";

export const WeatherContext = createContext();

//With the react state management i can share globally the data of the API call, with the name of the city selected
export const WeatherProvider = (props) => {
  const [jsonData, setJsonData] = useState({});
  const [cityName, setCityName] = useState("");
  let oldCityName = "";
  let newCityName = "";

  //Make an API call, with all the controls of the case. If the name of the city submitted is invalid, restore the previous location.
  useEffect(() => {
    newCityName = cityName;
    let countryCode =
      cityName.split(",")[1] === undefined ? "" : cityName.split(",")[1].trim();
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${
        cityName.length === 0 || cityName === undefined
          ? "Lecco"
          : cityName.split(",")[0]
      }${
        countryCode === "" || countryCode === undefined ? "" : `,${countryCode}`
      }&appid=fd2c86fbff118f10312f83b48138b8f8` //&lang=it
    )
      .then((response) => response.json())
      .then(
        (result) => {
          if (result.cod === "404" || result.message === "city not found") {
            alert(
              `Error! The chosen city has an invalid name${
                countryCode.length === 2 ? " or country" : ""
              }.${
                countryCode.length === 2
                  ? "\nPlease use ISO 3166 country codes."
                  : ""
              }${
                oldCityName === "" && newCityName !== ""
                  ? "\nThe weather will be shown in the default location."
                  : "\nThe weather will be shown in the previous location."
              }`
            );

            if (oldCityName === "" && newCityName !== "") {
              setCityName("Lecco");
              oldCityName = "";
              newCityName = "Lecco";
            } else {
              setCityName(oldCityName);
            }
          } else {
            setJsonData(result);
          }
        },
        (error) => {
          console.log("An error has occurred!");
          setCityName("Lecco");
        }
      );
    oldCityName = newCityName;
  }, [cityName]);

  return (
    <WeatherContext.Provider
      value={{ data: [jsonData, setJsonData], city: [cityName, setCityName] }}
    >
      {props.children}
    </WeatherContext.Provider>
  );
};
