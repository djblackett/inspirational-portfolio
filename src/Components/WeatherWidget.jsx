import React from "react";
import { useSelector } from "react-redux";
import {
  selectWeather,
  selectFetchingError,
  selectIsFetching,
} from "../features/weatherSlice";

function WeatherWidget() {
  const weather = useSelector(selectWeather);
  const isFetching = useSelector(selectIsFetching);
  const fetchingError = useSelector(selectFetchingError);

  if (isFetching) {
    return (
      <div className="weatherContainer">
        <p>Loading Weather...</p>
      </div>
    );
  } else if (fetchingError) {
    return (
      <div className="weatherContainer">
        <p>Error Fetching Weather</p>
      </div>
    );
  } else {
    return (
      <div className="weatherContainer">
        <img
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt="icon"
        />
        <div className="tempDescription">
          <p className="temp">
            {String((weather.temp - 273.15).toPrecision(3))}°
          </p>
          <p className="description">{weather.description}</p>
          <p className="weatherLocation">
            {weather.city}, {weather.country}
          </p>
        </div>
      </div>
    );
  }
}

export default WeatherWidget;
