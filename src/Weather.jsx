import React from 'react'
import "./Weather.css"
import WavesIcon from '@material-ui/icons/Waves';


function Weather() {
    return (
        <div className="weather">
            <p className="weather__time">Time: 22 October 2020</p>
            <p className="weather__maxAndMin">Max: 16°  Min: 12°</p>
            <div className="weather__info">
                <div className="weather__temperature">
                    <div className="weather__celsius">13°C</div>
                    <div className="weather__perceivedTemperature">
                        Perceived temperature: 14°
                    </div>
                </div>
                <div className="weather__icon">
                    <WavesIcon style={{fontSize:"150px"}}/>
                    <p className="weather__iconDescription">Foggy</p>
                </div>
                <div className="weather__otherInfo">
                    <div className="weather__humidity">
                        Umidità
                    </div>
                    <div className="weather__wind">
                        Vento
                    </div>
                    <div className="weather__windDirection">
                        Direzione
                    </div>
                </div>
            </div>
            <div className="weather__otherDays">
                <div className="weather__day">Lunedì</div>
                <div className="weather__shortInfo">
                    <div className="weather__otherIcon"><WavesIcon /> </div>
                    <div className="weather__otherMaxAndMin">Max and min</div>
                </div>
            </div>
        </div>
    )
}

export default Weather
