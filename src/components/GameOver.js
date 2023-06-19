import React, { useContext } from "react";
import { AppContext } from "../App";

export default function GameOver() {
  const { gameOver, solution, turn } = useContext(AppContext);

  if (gameOver.guessedWord) {
    return (
      <div className="modal">
        <div>
          <h1>You Win!</h1>
          <p className="solution">Solution is : {solution}</p>
          <p>You found the solution in {turn} guesses :)</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="modal">
        <div>
          <h1>You Lost!</h1>
          <p className="solution">Solution is : {solution}</p>
          <p>Better luck next time :)</p>
        </div>
      </div>
    );
  }
}
