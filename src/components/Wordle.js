import React, { useContext, useEffect } from "react";
import Grid from "./Grid";
import Keyboard from "./Keyboard";
import { AppContext } from "../App";
import GameOver from "./GameOver";

export default function Wordle() {
  const { handleKeyup, solution, gameOver } = useContext(AppContext);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);

    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup]);

  return (
    <div className="game">
      <div>{solution}</div>
      <Grid />
      <Keyboard />
      {gameOver.gameOver && <GameOver />}
    </div>
  );
}
