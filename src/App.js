import React, { Fragment, useEffect, useState } from "react";
import { createApi } from "unsplash-js";
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
import { getWeather } from "./features/weatherSlice";
import InputBar from "./Components/InputBar";
import BulletinBoard from "./Components/BulletinBoard";

// will be hidden later
// const accessKey = "FqHGLHi1ehTd0IdNZCKN8Fc5CJRruTU4nMnwLSvkj10";
// const secretKey = "8MDkcDf4ZIdD7SX9L76fFeXEqvHhkRnGeeLxJVdinoI";

// const api = createApi({
//   accessKey: accessKey,
// });

function App() {
  const currentImage = useSelector(selectCurrentImage);
  const dispatch = useDispatch();
  // console.log(moveBackward(), moveForward());

  useEffect(() => {
    dispatch(getQuoteOfDay());
    dispatch(getWeather());
    dispatch(getPhotos());
  }, []);

  return (
    <div className="App" style={{ backgroundImage: `url(${currentImage})` }}>
      {/* <div className="overlay"></div> */}
      <WeatherWidget />

      <div className="centerContainer">
        <button className="leftButton" onClick={() => dispatch(moveBackward())}>
          {"<"}
        </button>

        <BulletinBoard />

        <button className="rightButton" onClick={() => dispatch(moveForward())}>
          {">"}
        </button>
      </div>
      <Quote />
    </div>
  );
}

export default App;
