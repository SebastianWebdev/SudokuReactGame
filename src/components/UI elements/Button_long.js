import React from "react";
//css
import "./btn_long.css";
//global state
import { useRecoilState, useRecoilValue } from "recoil";
import { isDarkModeEnable as isDarkModeEnableAtom } from "../../atoms";

export default function Button_long(props) {
  const isDarkModeEnable = useRecoilValue(isDarkModeEnableAtom);
  const { text, classes, id, handler, active } = props;
  return (
    <button
      data-active={active ? "true" : "false"}
      onClick={handler}
      id={id}
      className={`${classes} ${
        isDarkModeEnable
          ? " dark_text-color-main dark_shadow"
          : "light-main-bg light_text-color-main"
      } btn_long`}
    >
      {text}
    </button>
  );
}
