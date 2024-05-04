import logo from "./logo.svg";
import "./App.scss";
import { useState } from "react";
import HomeScreen from "./components/HomeScreen";

function App() {
  const [word, setWord] = useState("");
  const [inPlay, setInPlay] = useState("");
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState(1);
  const [includeAthletes, setIncludeAthletes] = useState(true);
  const [includeCelebrities, setIncludeCelebrities] = useState(true);
  const [includeSuperheroes, setIncludeSuperheroes] = useState(true);
  const popularAthletes = [
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
  ];
  const popularCelebrities = [
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
  ];
  const popularSuperheroes = [
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
  ];
  // Function to randomly select an item from an array
  function getRandomItemFromArray(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  function generateRandomWord(options) {
    const selectedArray = [];

    // Check the options and populate selectedArray accordingly
    if (includeAthletes) {
      selectedArray.push(...popularAthletes);
    }
    if (includeCelebrities) {
      selectedArray.push(...popularCelebrities);
    }
    if (includeSuperheroes) {
      selectedArray.push(...popularSuperheroes);
    }

    // If no options are selected, return null
    if (selectedArray.length === 0) {
      return null;
    }

    setWord(getRandomItemFromArray(selectedArray))

  }

  return (
    <div className="App">
      <HomeScreen players={players} word={word} generateRandomWord={generateRandomWord} />
    </div>
  );
}

export default App;
