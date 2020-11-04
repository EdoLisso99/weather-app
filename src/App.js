import drizzle from "./icons/drizzle.svg";
import cloud from "./icons/cloud.svg";
import fog from "./icons/fog.svg";
import rain from "./icons/rain.svg";
import snow from "./icons/snow.svg";
import sunny from "./icons/sunny.png";
import thunder from "./icons/thunder.svg";
//import windy from "./icons/windy.svg";
import { WeatherContext } from "./WeatherContext";

import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Weather from "./Weather";

function App() {
  const { data } = useContext(WeatherContext);
  const [jsonData, setJsonData] = data;
  const [background, setBackground] = useState("");

  // MI SONO ROTTO I COGLIONI. NON RIESCE AD AGGIORNARMI IL BACKGROUND NONOSTANTE MI PRENDA L'ID, MANNAGGIA IL CLERO

  useEffect(() => {
    const x = jsonData.weather?.[0].id;
    if (x !== undefined) {
      let y =
        x >= 200 && x < 300
          ? 1
          : x >= 300 && x < 400
          ? 2
          : x >= 500 && x < 600
          ? 3
          : x >= 600 && x < 700
          ? 4
          : x >= 700 && x < 800
          ? 5
          : x === 800
          ? 6
          : x >= 801 && x < 810
          ? 7
          : 6;

      switch (y) {
        case 1:
          //return thunder;
          setBackground(thunder);
          break;
        case 2:
          //return drizzle;
          setBackground(drizzle);
          break;
        case 3:
          //return rain;
          setBackground(rain);
          break;
        case 4:
          //return snow;
          setBackground(snow);
          break;
        case 5:
          //return fog;
          setBackground(fog);
          break;
        case 6:
          //return sunny;
          setBackground(sunny);
          break;
        case 7:
          // return cloud;
          setBackground(cloud);
          break;
        default:
          // return sunny;
          setBackground(sunny);
          break;
      }
    }
  }, [jsonData]);

  return (
    <div className="app">
      <div className="app__background">
        {/* style={{
          backgroundImage: `url(${background})`,
        }} */}
        <Navbar />
        <Weather />
      </div>
    </div>
  );
}

export default App;
