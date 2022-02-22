import { createSlice } from "@reduxjs/toolkit";

let uniqueId = 0;
let colorIndex = 0;

const randomColor = () => {
  const colors = [
    "teal",
    "green",
    "magenta",
    "olive",
    "purple",
    "brown",
    "rgba(0,0,128, 0.8)",
    "darkorange",
    "darkgrey",
    "rgba(255, 0, 0, 0.8)",
    "orchid",
  ];
  let index = colorIndex;
  if (colorIndex === colors.length - 1) {
    colorIndex = 0;
  } else {
    colorIndex++;
  }
  return colors[index];
};

const options = {
  name: "listItems",
  initialState: {
    listItems: [
      {
        id: 11,
        text: "Buy ingredients for supper",
        completed: false,
        color: "green",
      },
      {
        id: 12,
        text: "Practice piano skills",
        completed: false,
        color: "blue",
      },
      {
        id: 13,
        text: "Walk the dog",
        completed: false,
        color: "red",
      },
      {
        id: 14,
        text: "Go to the gym",
        completed: false,
        color: "darkorange",
      },
      {
        id: 15,
        text: "Think of other cool things to do to add to my todo list",
        completed: false,
        color: "purple",
      },
    ],
  },
  reducers: {
    addListItem(state, action) {
      state.listItems.push({
        id: String(uniqueId++),
        color: randomColor(),
        ...action.payload,
      });
    },
    removeListItem(state, action) {
      state.listItems = state.listItems.filter(
        (item) => item.id !== action.payload
      );
    },
    completeItem(state, action) {
      let listItem = state.listItems.find((item) => item.id === action.payload);
      listItem.completed = !listItem.completed;
    },
  },
};

const listItemsSlice = createSlice(options);

export function selectListItems(state) {
  return state.listItems.listItems;
}

export const { addListItem, removeListItem, completeItem } =
  listItemsSlice.actions;

export default listItemsSlice.reducer;
