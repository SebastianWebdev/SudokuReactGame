import React, { useState, useEffect } from "react";
import "./Sudoku_board.css";

import Rect from "../Sudoku_rect/Sudoku_rect";

function Sudoku_board(props) {
  const { data, handleRect } = props;
  const sudokuRects = data.length > 0 ? data : [];
  const [selectedRect, setSeloectedRect] = useState();

  const rects = data.map((rect, index) => {
    const { row, col, number, isOriginalNumber } = rect;

    return (
      <Rect
        isOriginalNumber={isOriginalNumber}
        handleRect={handleRect}
        key={index + "rect"}
        index={index}
        number={number}
        row={row}
        column={col}
      />
    );
  });

  return (
    <div class="sudoku_board">{rects.length > 0 ? rects : "Jeszcze nie"}</div>
  );
}

export default Sudoku_board;
