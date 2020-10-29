import clearSky from "./icons/clearSky.jpg";
import cloud from "./icons/cloud.jpg";
import drizzle from "./icons/drizzle.jpg";
import mist from "./icons/mist.jpg";
import rain from "./icons/rain.jpg";
import snow from "./icons/snow.jpg";
import thunderstorm from "./icons/thunderstorm.jpg";

import React, { useContext, useEffect } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Weather from "./Weather";
import { WeatherContext } from "./WeatherContext";

// - Your API key is fd2c86fbff118f10312f83b48138b8f8

function App() {
  const { data } = useContext(WeatherContext);
  const [jsonData, setJsonData] = data;

  // MI SONO ROTTO I COGLIONI. NON RIESCE AD AGGIORNARMI IL BACKGROUND NONOSTANTE MI PRENDA L'ID, MANNAGGIA IL CLERO

  useEffect(() => {
    setBgImage();
  }, [jsonData]);

  const setBgImage = () => {
    if (jsonData.weather?.[0].id !== undefined) {
      const x = jsonData.weather?.[0].id;
      console.log("X: ", x, " type:", typeof x);

      switch (x) {
        case x >= 200 && x < 300:
          return thunderstorm;

        case x >= 300 && x < 400:
          return drizzle;

        case x >= 500 && x < 600:
          return rain;

        case x >= 600 && x < 700:
          return snow;

        case x >= 700 && x < 800:
          return mist;

        case x === 800:
          return clearSky;

        case x >= 801 && x < 810:
          return cloud;

        default:
          console.log("Entrato nel default");
          return clearSky;
      }
    }
  };

  return (
    <div className="app">
      <img src={setBgImage()} width="100" height="100"></img>
      <Navbar />
      <Weather />
    </div>
  );
}

export default App;
