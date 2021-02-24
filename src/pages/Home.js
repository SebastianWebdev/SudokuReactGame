import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//css
import "./home.css";
// components
import DifficultyRange from "../components/UI elements/SetDifficulty";
import Button from "../components/UI elements/Button_long";
import GameSelector from "../components/games_selector/GameSelector";
// recoil
import { useRecoilValue, useRecoilState } from "recoil";
import {
  isDarkModeEnable as isDarkModeEnableAtom,
  gamesThumbnails as gamesThumbnailsAtom,
  difficulty as df,
  selectedGameId as selectedGameIdAtom,
} from "../atoms";

// import database

import { GetDB, SetDB } from "../hooks/useDB";

export default function Home() {
  const [selectedGameId, setSelectedGameId] = useRecoilState(
    selectedGameIdAtom
  );
  const difficulty = useRecoilValue(df);
  const [gamesThumbnails, setGamesThumbnails] = useRecoilState(
    gamesThumbnailsAtom
  );
  const [numberOfGames, setNumberOfGames] = useState(-1);
  useEffect(() => {
    async function fetchData() {
      const data = await GetDB("thumbnailsGames");
      console.log(data);
      const numbersOfGamesData = data.filter((dat) => dat.level === difficulty)
        .length;
      setNumberOfGames(numbersOfGamesData);
      setGamesThumbnails({ games: data });
    }
    fetchData();
  }, []);
  useEffect(() => {
    const numbersOfGamesData = gamesThumbnails.games.filter(
      (dat) => dat.level === difficulty
    ).length;
    setNumberOfGames(numbersOfGamesData);
  }, [difficulty]);

  const handleNewGame = async () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const dateString = `${day < 10 ? "0" + day : day}:${
      month < 10 ? "0" + month : month
    }`;
    const game = { date: dateString, percentage: 0, level: difficulty };
    const newData = await SetDB("thumbnailsGames", game);
    console.log(newData);

    if (newData) {
      setGamesThumbnails({ games: newData });
      const numbersOfGamesData = newData.filter(
        (dat) => dat.level === difficulty
      ).length;
      setNumberOfGames(numbersOfGamesData);
    } else {
    }
  };
  return (
    <section id="home_wrap">
      <DifficultyRange />
      <GameSelector />
      <Button
        handler={handleNewGame}
        text="New game"
        active={numberOfGames < 6 && numberOfGames !== -1 ? true : false}
      />
      <Link to={`${selectedGameId ? "/game" : "/"}`}>
        <Button
          active={selectedGameId ? true : false}
          classes={`${selectedGameId ? "active" : ""}`}
          text="Play"
        />
      </Link>
    </section>
  );
}
