import React, { useState, useEffect } from "react";

// Assets
import { ReactComponent as Checker } from "../../assets/icons/kross.svg";
// Recoil state
import { useRecoilState, useRecoilValue } from "recoil";
import {
  isDarkModeEnable as isDarkModeEnableAtom,
  selectedGameId as selectedGameIdAtom,
} from "../../atoms";
export default function Game(props) {
  const [isActive, setIsActive] = useState(false);
  const isDarkModeEnable = useRecoilValue(isDarkModeEnableAtom);
  const { date, percentage, level, gameId, style } = props;
  const [selectedGameId, setSelectedGameId] = useRecoilState(
    selectedGameIdAtom
  );
  useEffect(() => {
    if (selectedGameId !== gameId) {
      setIsActive(false);
    }
  }, [selectedGameId]);
  const handleClick = (e) => {
    setSelectedGameId(gameId);
    setIsActive(true);
  };
  return (
    <div
      style={style}
      onClick={handleClick}
      className={`gameSelector_game ${
        isDarkModeEnable
          ? "dark_elements-bg dark_text-color-main btn_rected "
          : "light"
      } ${isActive ? "active" : ""}`}
    >
      <p className="level"> {date}</p>
      <div className="game_icon-wrap">
        <Checker />
      </div>

      <div className="bottom_info">
        <p className="percentage">{percentage}%</p>
      </div>
    </div>
  );
}
