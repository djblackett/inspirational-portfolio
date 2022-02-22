import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const accessKey = "7f12725cebc48256899d1bda1748836c";
// http://api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&appid=7f12725cebc48256899d1bda1748836c
export const getWeather = createAsyncThunk(
  "weather/getWeather",
  async (id, thunkAPI) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&appid=${accessKey}`
      );

      const json = await response.json();
      // console.log(json.list[0].weather[0].icon);
      // console.log(json.list[0].main.temp);
      const icon = json.list[0].weather[0].icon;

      // const iconResponse = await fetch(
      //   `https://openweathermap.org/img/wn/${icon}@2x.png`
      // );
      return {
        temp: json.list[0].main.temp,
        icon: icon,
        description: json.list[0].weather[0].description,
      };
    } catch (error) {
      console.log(error);
    }
  }
);

const options = {
  name: "weather",
  initialState: {
    weather: {},
    isFetching: true,
    fetchingError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getWeather.fulfilled, (state, action) => {
      state.isFetching = false;
      state.fetchingError = false;
      state.weather = action.payload;
    });
    builder.addCase(getWeather.pending, (state, action) => {
      state.isFetching = true;
      state.fetchingError = false;
    });
    builder.addCase(getWeather.rejected, (state, action) => {
      state.isFetching = false;
      state.fetchingError = true;
    });
  },
};

export const selectWeather = (state) => {
  // console.log(JSON.stringify(state.weather.weather.list[0]));
  return state.weather.weather;
};

export const selectIsFetching = (state) => {
  return state.weather.isFetching;
};

export const selectFetchingError = (state) => {
  return state.weather.fetchingError;
};

const weatherSlice = createSlice(options);

export default weatherSlice.reducer;
