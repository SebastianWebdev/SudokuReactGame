import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  isDarkModeEnable as isDarkModeEnableAtom,
  selectedNumber as selectedNumberAtom,
} from "../../atoms";

export default function Number(props) {
  const [selectedNumber, setSelectedNumber] = useRecoilState(
    selectedNumberAtom
  );
  const { number } = props;
  const [isSelected, setIsSelected] = useState(false);
  useEffect(() => {
    if (selectedNumber === number) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [selectedNumber]);
  const handleClick = (e) => {
    setSelectedNumber(number);
  };
  return (
    <div
      onClick={handleClick}
      className={`number ${
        isSelected ? "selected" : ""
      } dark_shadow dark_elements-bg `}
    >
      {number}
    </div>
  );
}
