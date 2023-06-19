import React, { useContext } from "react";
import { AppContext } from "../App";

export default function Key({ keyVal, bigKey, color }) {
  const { handleMouseClick } = useContext(AppContext);

  return (
    <div
      className={`key ${color}`}
      id={bigKey && "big"}
      onClick={() => handleMouseClick(keyVal)}
    >
      {keyVal}
    </div>
  );
}
