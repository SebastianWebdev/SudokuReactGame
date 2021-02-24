import React from "react";
// CSS
import "./difficultySelector.css";
// assets
import { ReactComponent as Arow } from "../../assets/icons/arow.svg";
// recoil
import { useRecoilValue, useRecoilState } from "recoil";
import {
  isDarkModeEnable as isDarkModeEnableAtom,
  difficulty as df,
  selectedGameId as selectedGameIdAtom,
} from "../../atoms";
//spring
import { useSpring, animated } from "react-spring";
const dfNames = {
  5: "Begginner",
  4: "Easy",
  3: "Normal",
  2: "Hard",
  1: "Extreme",
};

export default function SetDifficulty(props) {
  //state
  const [difficulty, setDifficulty] = useRecoilState(df);
  const isDarkModeEnable = useRecoilValue(isDarkModeEnableAtom);
  const [selectedGameId, setSelectedGameId] = useRecoilState(
    selectedGameIdAtom
  );
  // handlers
  const handleDifficultyChange = (e, type) => {
    setSelectedGameId(false);
    if (type === "decrease") {
      if (difficulty > 1) {
        const newDifficulty = difficulty - 1;
        setDifficulty(newDifficulty);
      }
    } else if (type === "increase") {
      if (difficulty < 5) {
        const newDifficulty = difficulty + 1;
        setDifficulty(newDifficulty);
      }
    }
  };

  return (
    <div className="difficulty_selector">
      <div
        onClick={(e) => {
          handleDifficultyChange(e, "decrease");
        }}
        className={`dificulty_arrow-wrap ${
          isDarkModeEnable
            ? "theme_dark "
            : "light-main-bg light_text-color-main"
        }`}
      >
        <div
          className={`arrow arrow_left ${
            isDarkModeEnable
              ? "theme_dark "
              : "light-main-bg light_text-color-main"
          }`}
        ></div>
      </div>
      <div className={`difficulty_value `}>
        {Object.keys(dfNames).map((key) => (
          <p
            style={{ transform: `translateX(${-100 * (difficulty - 1)}%)` }}
            key={key}
            className="difficulty"
          >
            {dfNames[key]}
          </p>
        ))}
      </div>
      <div
        className={`dificulty_arrow-wrap ${
          isDarkModeEnable
            ? "theme_dark "
            : "light-main-bg light_text-color-main"
        } `}
      >
        <div
          onClick={(e) => {
            handleDifficultyChange(e, "increase");
          }}
          className={`arrow arrow_right ${
            isDarkModeEnable
              ? "theme_dark "
              : "light-main-bg light_text-color-main"
          }`}
        ></div>
      </div>
    </div>
  );
}
