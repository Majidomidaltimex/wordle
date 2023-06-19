import { createContext, useEffect, useState } from "react";
import "./index.css";
import Wordle from "./components/Wordle";

export const AppContext = createContext();

function App() {
  const [solution, setSolution] = useState(null);
  const [turn, setTurn] = useState(0);
  const [guesses, setGuesses] = useState([...Array(6)]);
  const [history, setHistory] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });
  const [usedKeys, setUsedKeys] = useState({});

  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((l) => {
      return { key: l, color: "grey" };
    });

    //find green letters
    formattedGuess.forEach((l, i) => {
      if (solutionArray[i] === l.key) {
        formattedGuess[i].color = "green";
        solutionArray[i] = null;
      }
    });

    //find yellow letters
    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== "green") {
        formattedGuess[i].color = "yellow";
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    });

    return formattedGuess;
  };

  //add a new guess to guesses state'
  //update isCorrect state if guess is correct
  //add a turn to state
  const newGuess = (formattedGuess) => {
    setGuesses((prev) => {
      let newGuesses = [...prev];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });

    setHistory((prev) => {
      return [...prev, currentGuess];
    });

    setTurn((prev) => {
      return prev + 1;
    });

    if (currentGuess === solution) {
      setTimeout(() => {
        setGameOver({ gameOver: true, guessedWord: true });
      }, 1800);
    }
    if (currentGuess !== solution && turn === 5) {
      setTimeout(() => {
        setGameOver({ gameOver: true, guessedWord: false });
      }, 1800);
    }
    console.log(turn);

    setUsedKeys((prevUsedKeys) => {
      let newKeys = { ...prevUsedKeys };
      formattedGuess.forEach((l) => {
        const currentColor = newKeys[l.key];
        if (l.color === "green") {
          newKeys[l.key] = "green";
          return;
        }
        if (l.color === "yellow" && currentColor !== "green") {
          newKeys[l.key] = "yellow";
          return;
        }
        if (
          l.color === "grey" &&
          currentColor !== "yellow" &&
          currentColor !== "green"
        ) {
          newKeys[l.key] = "grey";
          return;
        }
      });

      return newKeys;
    });
    setCurrentGuess("");
  };

  //handle key event and track guess
  const handleKeyup = ({ key }) => {
    if (gameOver.gameOver) {
      return;
    }
    //submit answer if user presses enter
    if (key === "Enter") {
      //check if 5 guesses have alreadey been submitted
      if (turn > 5) {
        console.log("no more guesses");
        return;
      }
      //check if word has already been submitted
      if (history.includes(currentGuess)) {
        console.log("that word has already been submitted");
        return;
      }

      //word must have 5 characters
      if (currentGuess.length !== 5) {
        console.log("must have 5 characters");
        return;
      }
      const formatted = formatGuess();
      newGuess(formatted);
    }
    //deletes character
    if (key === "Backspace") {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      });
    }
    //checks if key pressed includes is a letter including accents
    if (/^[A-zàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]$/.test(key)) {
      key = key.toUpperCase();
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key;
        });
      }
    }
  };

  //onscreen keyboard click
  const handleMouseClick = (key) => {
    //submit answer if user presses enter
    if (key === "ENTER") {
      //check if 5 guesses have alreadey been submitted
      if (turn > 5) {
        console.log("no more guesses");
        return;
      }
      //check if word has already been submitted
      if (history.includes(currentGuess)) {
        console.log("that word has already been submitted");
        return;
      }

      //word must have 5 characters
      if (currentGuess.length !== 5) {
        console.log("must have 5 characters");
        return;
      }
      const formatted = formatGuess();
      newGuess(formatted);
    }
    //deletes character
    if (key === "DELETE") {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      });
    }
    //checks if key pressed includes is a letter including accents
    if (/^[A-zàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key;
        });
      }
    }
  };

  //fetch words from local json-server
  useEffect(() => {
    fetch("http://localhost:3001/solutions")
      .then((res) => res.json())
      .then((json) => {
        const randomSolution = json[Math.floor(Math.random() * json.length)];
        setSolution(randomSolution.word.toUpperCase());
      });
  }, []);

  return (
    <div className="App">
      <h1>Wordle</h1>
      <AppContext.Provider
        value={{
          solution,
          turn,
          setTurn,
          usedKeys,
          guesses,
          setGuesses,
          history,
          setHistory,
          currentGuess,
          setCurrentGuess,
          gameOver,
          handleKeyup,
          handleMouseClick,
        }}
      >
        {solution && <Wordle solution={solution} />}
      </AppContext.Provider>
    </div>
  );
}

export default App;
