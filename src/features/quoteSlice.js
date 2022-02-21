import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getQuoteOfDay = createAsyncThunk(
  "quote/getQuoteOfDay",
  async (id, thunkAPI) => {
    try {
      const response = await fetch("https://quotes.rest/qod?language=en");
      // console.log(response);
      const json = await response.json();
      // console.log(json);
      const quote = json.contents.quotes[0];
      return quote;
    } catch (error) {
      console.log(error);
    }
  }
);

const options = {
  name: "quote",
  initialState: {
    quote: {},
    isFetching: true,
    fetchingError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getQuoteOfDay.fulfilled, (state, action) => {
      state.isFetching = false;
      state.fetchingError = false;
      state.quote = action.payload;
    });
    builder.addCase(getQuoteOfDay.pending, (state, action) => {
      state.isFetching = true;
      state.fetchingError = false;
    });
    builder.addCase(getQuoteOfDay.rejected, (state, action) => {
      state.isFetching = false;
      state.fetchingError = true;
    });
  },
};

export const selectQuote = (state) => {
  // console.log(JSON.stringify(state.quote));
  return state.quote.quote;
};

export const selectIsFetching = (state) => {
  return state.quote.isFetching;
};

export const selectFetchingError = (state) => {
  return state.quote.fetchingError;
};

const quoteSlice = createSlice(options);

export default quoteSlice.reducer;
