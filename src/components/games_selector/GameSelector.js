import React from "react";
//CSS
import "./game_selector.css";
// components
import Game from "./Game";
// spring
import { Transition, animated } from "react-spring/renderprops";
// recoils
import { useRecoilValue, useRecoilState } from "recoil";
import {
  isDarkModeEnable as isDarkModeEnableAtom,
  difficulty as df,
  gamesThumbnails as gamesThumbnailsAtom,
} from "../../atoms";

export default function GameSelector(props) {
  const difficulty = useRecoilValue(df);
  const games = useRecoilValue(gamesThumbnailsAtom)
    .games.filter((game) => game.level === difficulty)
    .map((game) => (
      <Game
        gameId={game.id}
        key={game.id}
        date={game.date}
        percentage={game.percentage}
        date={game.date}
      />
    ));

  return <animated.div id="game_selector">{games}</animated.div>;
}
/*

 <Transition
        items={games}
        keys={(item) => item.id}
        from={{ transform: "translate3d(-100%,0px,0)" }}
        enter={{ transform: "translate3d(0,0px,0)" }}
        leave={{ transform: "translate3d(40px,0px,0)" }}
        trail={30}
      >
        {(item) => (props) => (
          <Game
            style={props}
            gameId={item.id}
            key={item.id}
            date={item.date}
            percentage={item.percentage}
          />
        )}
      </Transition>
*/
