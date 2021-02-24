import React, { useState, useEffect } from "react";
// Component css
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// Sudoku Api functions

// React Components
import Home from "../../pages/Home";
import Header from "../Header/Header";
import GameBoard from "../../pages/Game";
// Recoil state
import { useRecoilState, useRecoilValue } from "recoil";
import { isDarkModeEnable as isDarkModeEnableAtom } from "../../atoms";

function App() {
  //REcoil state
  const isDarkModeEnable = useRecoilValue(isDarkModeEnableAtom);

  // react state
  const [sudokuRawData, setSudokuRawData] = useState({});
  const [sudokuBoard, setSudokuBoard] = useState([]);
  const [sudokuFullBoard, setSudokuFullBoard] = useState([]);
  const [difficulty, setDifficulty] = useState(3);

  return (
    <Router>
      <div
        className={`app ${
          isDarkModeEnable ? "dark_main-bg dark_text-color-main" : "light"
        }`}
      >
        <Header></Header>
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/game" component={GameBoard} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
