import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  isDarkModeEnable as isDarkModeEnableAtom,
  selectedNumber as selectedNumberAtom,
} from "../../atoms";
import Number from "./Number";
import "./style.css";
export default function NumbersPanel(props) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const numbersComponents = numbers.map((number) => (
    <Number key={number} number={number} />
  ));
  return <div className="numbers_panel">{numbersComponents}</div>;
}
