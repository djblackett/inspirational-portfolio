import React, { useEffect } from "react";
import "./App.css";
import Quote from "./Components/Quote";
import WeatherWidget from "./Components/WeatherWidget";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentImage,
  moveBackward,
  moveForward,
  getPhotos,
} from "./features/backgroundSlice";
import { getQuoteOfDay } from "./features/quoteSlice";
import { getCoordinates, getWeather } from "./features/weatherSlice";
import BulletinBoard from "./Components/BulletinBoard";

function App() {
  const currentImage = useSelector(selectCurrentImage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuoteOfDay());
    dispatch(getWeather());
    dispatch(getPhotos());
  }, []);

  function geoFindMe() {
    function success(position) {
      let coordinates = {};
      coordinates["lat"] = position.coords.latitude;
      coordinates["lon"] = position.coords.longitude;
      dispatch(getCoordinates(coordinates));
      dispatch(getWeather());
    }

    function error() {
      console.log("Unable to retrieve your location");
    }

    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  return (
    <div className="App" style={{ backgroundImage: `url(${currentImage})` }}>
      <button className="location" onClick={() => geoFindMe()}>
        Use my location for local weather
      </button>
      <WeatherWidget />

      <div className="centerContainer">
        <button
          id="leftButton"
          className="navButton"
          onClick={() => dispatch(moveBackward())}
        >
          {"<"}
        </button>

        <BulletinBoard />

        <button
          id="rightButton"
          className="navButton"
          onClick={() => dispatch(moveForward())}
        >
          {">"}
        </button>
      </div>
      <Quote />
    </div>
  );
}

export default App;
