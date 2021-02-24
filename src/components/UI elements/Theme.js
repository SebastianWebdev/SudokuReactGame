import React, { useState } from "react";
import "./theme.css";
// assets
import { ReactComponent as Moon } from "../../assets/icons/Moon.svg";
import { ReactComponent as Sun } from "../../assets/icons/sun.svg";
// Recoil state
import { useRecoilState } from "recoil";
import { isDarkModeEnable as isDarkModeEnableAtom } from "../../atoms";
export default function Theme() {
  const [isDarkModeEnable, setisDarkModeEnable] = useRecoilState(
    isDarkModeEnableAtom
  );
  const [position, setPosition] = useState("left");
  const handlePosition = (e) => {
    e.stopPropagation();
    setisDarkModeEnable(!isDarkModeEnable);
  };
  return (
    <div className="theme_switcher-wrap">
      <Moon className={`${!isDarkModeEnable ? "dark" : "light"}`} />
      <div
        className={`theme-btn ${
          !isDarkModeEnable ? "dark_main-bg" : " light-main-bg"
        }`}
        id="theme_switcher"
        onClick={handlePosition}
      >
        <div
          id="theme_btn"
          className={`theme-btn ${
            isDarkModeEnable
              ? "dark_main-bg dark_text-color-main left"
              : "light-main-bg right"
          } `}
        ></div>
      </div>
      <Sun className={`${!isDarkModeEnable ? "dark" : "light"}`} />
    </div>
  );
}
