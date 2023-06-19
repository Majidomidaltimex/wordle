import React, { useContext } from "react";
import Row from "./Row";
import { AppContext } from "../App";

export default function Grid({}) {
  const { currentGuess, guesses, turn } = useContext(AppContext);
  return (
    <div>
      {guesses.map((g, i) => {
        if (turn === i) {
          return <Row key={i} currentGuess={currentGuess} />;
        }
        return <Row key={i} guess={g} />;
      })}
    </div>
  );
}
