import React, { useEffect, useState } from "react";
// Recoil state
import { useRecoilState, useRecoilValue } from "recoil";
//sudoku function
import { sudoku } from "../utilitys/sudoku/sudoku";
import {
  isDarkModeEnable as isDarkModeEnableAtom,
  selectedGameId as selectedGameIdAtom,
  difficulty as df,
} from "../atoms";
// styles

import "./game.css";
//DB
import { GetDB, SetDB, GetSudoku } from "../hooks/useDB";

// react components
import SudokuBoard from "../components/Sudoku_board/Sudoku_board";
import Clock from "../components/UI elements/Clock";
import NumbersPanel from "../components/numbersPanel/NumbersPanel";
export default function Game() {
  const sudokuDbName = "sudokuDB";
  //recoil state
  const selectedGameId = useRecoilValue(selectedGameIdAtom);
  const isDarkModeEnable = useRecoilValue(isDarkModeEnableAtom);
  const difficulty = useRecoilValue(df);
  // sudoku state
  const [solved, setSolved] = useState([]);
  const [toSolve, setToSolve] = useState([]);
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState();
  // init Sudoku
  useEffect(() => {
    const fetchData = async () => {
      const sudokuData = await GetSudoku(selectedGameId);

      if (sudokuData) {
        setSolved(sudokuData.solved);
        setToSolve(sudokuData.toSolve);
        if (sudokuData.time) {
          setTime(sudokuData.time);
        }
      } else {
        console.log("brak sudoku");

        const sudokuArray = await sudoku.generateSudokuAsync(difficulty);

        const newSudokuData = {
          common_id: selectedGameId,
          solved: mapData(sudokuArray.origin.numbersArr),
          toSolve: mapData(sudokuArray.toSolve.numbersArr),
          difficulty,
          time,
        };
        const isDataCreatd = await SetDB(sudokuDbName, newSudokuData);
        const sudokuData = await GetSudoku(selectedGameId);
        setSolved(sudokuData.solved);
        setToSolve(sudokuData.toSolve);
      }
    };
    fetchData();
    const intervalId = setInterval(() => {
      setTime((time) => time + 1);
      const dataToSave = {
        common_id: selectedGameId,
        solved: solved,
        toSolve: toSolve,
        difficulty,
        time,
      };
    }, 1000);
    setIntervalId(intervalId);
  }, []);

  return (
    <div className="game_wrap">
      <div className="game_top-bar">
        <div className="timer">
          <Clock time={time} />
        </div>
      </div>
      <SudokuBoard data={toSolve} />
      <div className="gameBottomBar">
        <NumbersPanel />
      </div>
    </div>
  );
}
const mapData = (board = []) => {
  const mapped = [];
  board.forEach((row, i) => {
    row.forEach((rect, j) => {
      const isOriginalNumber = rect !== 0;
      mapped.push({ row: i, col: j, number: rect, isOriginalNumber });
    });
  });
  return mapped;
};
