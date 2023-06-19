import React, { useContext, useState } from "react";
import Key from "./Key";
import { AppContext } from "../App";

export default function Keyboard() {
  const { usedKeys } = useContext(AppContext);
  const [accentKeyboard, setAccentKeyboard] = useState(false);
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  const accents1 = ["Â", "Ê", "Î", "Ô", "Û", "Ç"];
  const accents2 = ["Ä", "Ë", "Ï", "Ü", "Ÿ"];
  const accents3 = ["À", "È", "É", "Œ", "Ù"];

  if (accentKeyboard) {
    return (
      <div className="keyboard">
        <div className="line1">
          {accents1.map((key) => {
            const color = usedKeys[key];
            return <Key keyVal={key} color={color} />;
          })}
        </div>
        <div className="line2">
          {accents2.map((key) => {
            const color = usedKeys[key];
            return <Key keyVal={key} color={color} />;
          })}
          <div
            className="key"
            id="big"
            onClick={() => setAccentKeyboard(false)}
          >
            Accent
          </div>
        </div>
        <div className="line3">
          <Key keyVal={"ENTER"} bigKey />
          {accents3.map((key) => {
            const color = usedKeys[key];
            return <Key keyVal={key} color={color} />;
          })}
          <Key keyVal={"DELETE"} bigKey />
        </div>
      </div>
    );
  } else {
    return (
      <div className="keyboard">
        <div className="line1">
          {keys1.map((key) => {
            const color = usedKeys[key];
            return <Key keyVal={key} color={color} />;
          })}
        </div>
        <div className="line2">
          {keys2.map((key) => {
            const color = usedKeys[key];
            return <Key keyVal={key} color={color} />;
          })}
          <div className="key" id="big" onClick={() => setAccentKeyboard(true)}>
            Accent
          </div>
        </div>
        <div className="line3">
          <Key keyVal={"ENTER"} bigKey />
          {keys3.map((key) => {
            const color = usedKeys[key];
            return <Key keyVal={key} color={color} />;
          })}
          <Key keyVal={"DELETE"} bigKey />
        </div>
      </div>
    );
  }
}
