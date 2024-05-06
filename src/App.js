import logo from "./logo.svg";
import "./App.scss";
import { useEffect, useState } from "react";
import HomeScreen from "./components/HomeScreen";
import Settings from "./components/Settings";
import GameScreen from "./components/GameScreen";

function App() {
  const [word, setWord] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState(false);
  const [players, setPlayers] = useState(4);
  const [imposters, setImposters] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [playerArray, setPlayerArray] = useState([]);

  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [showCategory, setShowCategory] = useState(() => {
    const storedShowCategory = localStorage.getItem("showCategory");
    return storedShowCategory !== null ? storedShowCategory === "true" : true;
  });


  const [wordArrays, setWordArrays] = useState(() => {
    const storedWordArrays = JSON.parse(localStorage.getItem("wordArrays"));
    return storedWordArrays || {
      athletes: {
        name: "Athletes",
        include: true,
        words: [
          "LeBron James",
          "Serena Williams",
          "Cristiano Ronaldo",
          "Lionel Messi",
          "Tom Brady",
          "Usain Bolt",
          "Michael Phelps",
          "Roger Federer",
          "Simone Biles",
          "Kevin Durant",
          // Add more athletes as needed
        ],
      },
      celebrities: {
        name: "Celebrities",
        include: true,
        words: [
          "Dwayne Johnson",
          "Beyoncé",
          "Taylor Swift",
          "Ellen DeGeneres",
          "Jennifer Lawrence",
          "Robert Downey Jr.",
          "Angelina Jolie",
          "Leonardo DiCaprio",
          "Oprah Winfrey",
          "Kanye West",
          // Add more celebrities as needed
        ],
      },
      superheroes: {
        name: "Superheroes",
        include: true,
        words: [
          "Superman",
          "Batman",
          "Spider-Man",
          "Wonder Woman",
          "Iron Man",
          "Captain America",
          "Hulk",
          "Thor",
          "Black Panther",
          "Captain Marvel",
          // Add more superheroes as needed
        ],
      },
      // Add more word arrays as needed
    };
  });

  useEffect(() => {
    localStorage.setItem("showCategory", showCategory);
  }, [showCategory]);
  useEffect(() => {
    localStorage.setItem("wordArrays", JSON.stringify(wordArrays));
  }, [wordArrays]);





  useEffect(() => {
    if (playing) {
      // Create an array with the generated word repeated players times
      let newPlayerArray = Array.from({ length: players }, () => word);

      // Insert "You are the Imposter" strings randomly for each imposter
      for (let i = 0; i < imposters; i++) {
        newPlayerArray[i] = "Yow are an imposter";
      }
      newPlayerArray.sort(() => Math.random() - 0.5);
      // Set the newPlayerArray to the playerArray state
      setPlayerArray(newPlayerArray);
    }
  }, [playing, word, players, imposters]);


  const toggleShowCategory = () => {
    setShowCategory(!showCategory);
  };

  // Function to randomly select an item from an array
  function getRandomItemFromArray(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  // Function to generate a random word based on selected options
  function generateRandomWord() {
    const selectedArray = [];

    // Iterate over wordArrays and populate selectedArray based on settings
    for (const [key, value] of Object.entries(wordArrays)) {
      if (wordArrays[key].include) {
        // Add each word along with its category to selectedArray
        value.words.forEach((word) => {
          selectedArray.push({ word, category: value.name });
        });
      }
    }

    // If no options are selected, return null
    if (selectedArray.length === 0) {
      return null;
    }

    // Select a random item (word and category) from selectedArray
    const randomItem = getRandomItemFromArray(selectedArray);

    // Set the word and category in the state
    setWord(randomItem.word);
    setCategory(randomItem.category);
  }

  const toggleInclude = (arrayName) => {
    setWordArrays((prevSettings) => ({
      ...prevSettings,
      [arrayName]: {
        ...prevSettings[arrayName],
        include: !prevSettings[arrayName].include,
      },
    }));
  };

  const changeSettings = () => {
    setSettings(!settings);
  };

  const startGamePlay = () => {
    setCurrentPlayer(1);
    generateRandomWord(); // Generate the random word and its category

    // Set the playing state to true
    setPlaying(true);
  };

  const nextPlayer = () => {
    if (currentPlayer < players) {
      setCurrentPlayer(currentPlayer + 1);
    } else {
      setPlaying(false);
    }
  };

  // this is for the players

  const incrementPlayers = () => {
    setPlayers((prevPlayers) => prevPlayers + 1);
    // Ensure imposters is never more than players
    if (imposters >= players) {
      setImposters((prevImposters) => prevImposters + 1);
    }
  };

  const decrementPlayers = () => {
    if (players > 1) {
      setPlayers((prevPlayers) => prevPlayers - 1);
      // Ensure imposters is never more than players
      if (imposters >= players - 1) {
        setImposters((prevImposters) => prevImposters - 1);
      }
    }
  };

  const incrementImposters = () => {
    if (imposters < players) {
      setImposters((prevImposters) => prevImposters + 1);
    }
  };

  const decrementImposters = () => {
    if (imposters > 1) {
      setImposters((prevImposters) => prevImposters - 1);
    }
  };

  if (settings) {
    return (
      <div className="App">
        <Settings
          toggleShowCategory={toggleShowCategory}
          showCategory={showCategory}
          wordArrays={wordArrays}
          toggleInclude={toggleInclude}
          changeSettings={changeSettings}
        />
      </div>
    );
  } else if (playing) {
    return (
      <div className="App">
        <GameScreen
          players={players}
          showCategory={showCategory}
          category={category}
          word={word}
          currentPlayer={currentPlayer}
          playing={playing}
          playerArray={playerArray}
          nextPlayer={nextPlayer}
        />
      </div>
    );
  } else {
    return (
      <div className="App">
        <HomeScreen
          startGamePlay={startGamePlay}
          players={players}
          word={word}
          incrementPlayers={incrementPlayers}
          incrementImposters={incrementImposters}
          decrementImposters={decrementImposters}
          decrementPlayers={decrementPlayers}
          imposters={imposters}
          changeSettings={changeSettings}
          generateRandomWord={generateRandomWord}
        />
      </div>
    );
  }
}

export default App;
