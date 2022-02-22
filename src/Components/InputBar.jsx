import React from "react";
import { useDispatch } from "react-redux";
import { addListItem } from "../features/listItemsSlice";

function InputBar() {
  const dispatch = useDispatch();

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      let text = event.target.value;
      if (text === "") return;
      const newEntry = {
        text: text,
        completed: false,
      };
      dispatch(addListItem(newEntry));
      document.getElementById("input").value = "";
    }
  };

  return (
    <div className="inputComponent" tabIndex={0}>
      <p className="inputDescription">What's on your mind today?</p>
      <input
        id="input"
        className={`input`}
        type="text"
        onKeyDown={(e) => handleEnterPress(e)}
        autoComplete="off"
      />
    </div>
  );
}

export default InputBar;
