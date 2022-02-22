import { createApi } from "unsplash-js";
import { response } from "./images";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const unsplash = createApi({
  accessKey: "FqHGLHi1ehTd0IdNZCKN8Fc5CJRruTU4nMnwLSvkj10",
});

const urlArray = response.map((e) => e.urls.regular);

const photosArray = async () =>
  await unsplash.photos.getRandom({
    count: 10,
  });

export const getPhotos = createAsyncThunk(
  "background/getPhotos",
  async (id, thunkAPI) => {
    try {
      const response = await unsplash.photos.getRandom({
        count: 10,
      });
      // console.log(response);
      const json = await response.json();
      // console.log(json);
      const photos = json.map((e) => e.urls.regular);
      return photos;
    } catch (error) {
      console.log(error);
    }
  }
);

const options = {
  name: "background",
  initialState: {
    images: [
      "https://images.unsplash.com/photo-1641988076864-933422e0af0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDExNDR8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDQ4MDA1MTE&ixlib=rb-1.2.1&q=80&w=1080",
    ],
    currentIndex: 0,
    currentImage:
      "https://images.unsplash.com/photo-1641988076864-933422e0af0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDExNDR8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDQ4MDA1MTE&ixlib=rb-1.2.1&q=80&w=1080",
    isFetching: false,
    fetchingError: false,
  },
  reducers: {
    moveForward(state) {
      if (state.currentIndex < 9) {
        ++state.currentIndex;
      } else {
        state.currentIndex = 0;
      }
      console.log(JSON.stringify(state));
      state.currentImage = state.images[state.currentIndex];
    },
    moveBackward(state) {
      if (state.currentIndex > 0) {
        --state.currentIndex;
      } else {
        state.currentIndex = 9;
      }
      state.currentImage = state.images[state.currentIndex];
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getPhotos.fulfilled, (state, action) => {
      state.isFetching = false;
      state.fetchingError = false;
      state.photos = [state.currentImage, ...action.payload];
    });
    builder.addCase(getPhotos.pending, (state, action) => {
      state.isFetching = true;
      state.fetchingError = false;
    });
    builder.addCase(getPhotos.rejected, (state, action) => {
      state.isFetching = false;
      state.fetchingError = true;
    });
  },
};

export const selectCurrentImage = (state) => {
  return state.background.currentImage;
};

const backgroundSlice = createSlice(options);

export const { moveBackward, moveForward } = backgroundSlice.actions;
export default backgroundSlice.reducer;
