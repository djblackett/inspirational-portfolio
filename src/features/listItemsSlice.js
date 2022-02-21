import { createSlice } from "@reduxjs/toolkit";

let uniqueId = 0;

// const initializeData = () => {
//   // get the todos from localstorage
//   const savedTodos = localStorage.getItem("todos");
//   // if there are todos stored
//   if (savedTodos && savedTodos !== "[]") {
//     // return the parsed JSON object back to a javascript object
//     return JSON.parse(savedTodos);
//     // otherwise
//   } else {
//     // return an empty array
//     //return initialData;
//   }
// };
let colorIndex = 0;
const randomColor = () => {
  const colors = [
    "teal",
    "green",
    "magenta",
    "olive",
    "purple",
    "brown",
    "rgba(0,0,128, 0.5)",
    "darkorange",
    "darkgrey",
    "rgba(255, 0, 0, 0.5)",
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
        text: "hello mr potato head",
        completed: false,
        color: "green",
      },
      { id: 12, text: "hello mr potato foot", completed: false, color: "blue" },
      {
        id: 13,
        text: "nonononon onono nono nono nonono nono",
        completed: false,
        color: "red",
      },
      {
        id: 14,
        text: "nonono nonon onon onon onon onon onono",
        completed: false,
        color: "orange",
      },
      {
        id: 15,
        text: "nononon onon onon ono nono nonon onono",
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
    reorderItems(state, action) {
      state.listItems = action.payload;
      return state;
    },
    applyFilter(state, action) {
      state.filteredListItems = action.payload;
    },
    completeItem(state, action) {
      let listItem = state.listItems.find((item) => item.id === action.payload);
      listItem.completed = !listItem.completed;
    },
    clearCompletedItems(state) {
      state.listItems = state.listItems.filter((item) => !item.completed);
    },
    resetList(state) {
      // state.listItems = initialData;
    },
  },
};

const listItemsSlice = createSlice(options);

export function selectListItems(state) {
  // console.log(state);
  // console.log(state.listItems);
  return state.listItems.listItems;
}

export const {
  addListItem,
  removeListItem,
  reorderItems,
  applyFilter,
  completeItem,
  clearCompletedItems,
  resetList,
} = listItemsSlice.actions;

export default listItemsSlice.reducer;
