import React from "react";
import InputBar from "./InputBar";
import { useSelector, useDispatch } from "react-redux";
import {
  selectListItems,
  removeListItem,
  completeItem,
} from "../features/listItemsSlice";

function BulletinBoard() {
  const listItems = useSelector(selectListItems);
  const dispatch = useDispatch();

  return (
    <div className="bulletinContainer">
      <InputBar />

      <ul className="bulletin">
        {listItems.map((item) => {
          const buttonStyle = () => {
            if (item.completed) {
              return { opacity: "0.2" };
            } else {
              return { opacity: "0.8" };
            }
          };

          return (
            <li
              className="listItem"
              key={item.id}
              style={{ backgroundColor: item.color, ...buttonStyle() }}
            >
              <div className="actions">
                <button
                  className="removeButton"
                  onClick={() => dispatch(removeListItem(item.id))}
                >
                  Remove
                </button>
                <button
                  className="doneButton"
                  onClick={() => dispatch(completeItem(item.id))}
                >
                  Done
                </button>
              </div>
              <p>{item.text}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BulletinBoard;
