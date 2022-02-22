import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Cannot hide access key without going through a relay server
// Throwaway account just for development
const accessKey = "7f12725cebc48256899d1bda1748836c";

export const getWeather = createAsyncThunk(
  "weather/getWeather",
  async (id, thunkAPI) => {
    try {
      const { lat, lon } = thunkAPI.getState().weather.coordinates;

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${accessKey}`
      );

      const json = await response.json();
      console.log(json);

      const icon = json.list[0].weather[0].icon;
      return {
        temp: json.list[0].main.temp,
        icon: icon,
        description: json.list[0].weather[0].description,
        city: json.city.name,
        country: json.city.country,
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
    coordinates: { lat: 35, lon: 135 },
    isFetching: true,
    fetchingError: false,
  },
  reducers: {
    getCoordinates(state, action) {
      state.coordinates = action.payload;
    },
  },
  extraReducers: (builder) => {
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
  return state.weather.weather;
};

export const selectIsFetching = (state) => {
  return state.weather.isFetching;
};

export const selectFetchingError = (state) => {
  return state.weather.fetchingError;
};

const weatherSlice = createSlice(options);
export const { getCoordinates } = weatherSlice.actions;
export default weatherSlice.reducer;
