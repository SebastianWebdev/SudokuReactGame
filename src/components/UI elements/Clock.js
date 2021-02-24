import React, { useState, useEffect } from "react";

export default function Clock(props) {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const { time } = props;
  useEffect(() => {
    const secondsTemp = time % 60;
    const minutsTemp = Math.floor(time / 60) % 60;
    const hoursTemp = Math.floor(time / 3600) % 24;
    setSeconds(secondsTemp < 10 ? `0${secondsTemp}` : `${secondsTemp}`);
    setMinutes(minutsTemp < 10 ? `0${minutsTemp}` : `${minutsTemp}`);
    setHours(hoursTemp < 10 ? `0${hoursTemp}` : `${hoursTemp}`);
  }, [time]);

  return (
    <p className="timer">
      {hours ? hours : ""}:{minutes ? minutes : ""}:{seconds ? seconds : ""}
    </p>
  );
}
