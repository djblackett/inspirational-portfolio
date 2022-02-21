import { configureStore } from "@reduxjs/toolkit";
import backgroundReducer from "../features/backgroundSlice";
import quoteReducer from "../features/quoteSlice";
import weatherReducer from "../features/weatherSlice";
import listItemsReducer from "../features/listItemsSlice";

export const store = configureStore({
  reducer: {
    background: backgroundReducer,
    quote: quoteReducer,
    weather: weatherReducer,
    listItems: listItemsReducer,
  },
});
