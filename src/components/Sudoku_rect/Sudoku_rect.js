import React, { useState, useEffect } from "react";
import "./sudoku_rect.css";
function Sudoku_rect(props) {
  const { number, row, column, handleRect, isOriginalNumber } = props;
  const [choosenNumber, setChoosenNumber] = useState();
  const [smallNumbers, setSmallNumbers] = useState([]);

  return (
    <div
      data-basenumber={isOriginalNumber}
      data-row={row}
      data-column={column}
      onClick={handleRect}
      class={`sudoku-rect ${column === 0 ? "leftBorder" : ""}`}
    >
      {number === 0 ? "" : number}
    </div>
  );
}
export default Sudoku_rect;
