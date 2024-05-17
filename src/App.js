import logo from "./logo.svg";
import "./App.scss";
import { useEffect, useState } from "react";
import HomeScreen from "./components/HomeScreen";
import Settings from "./components/Settings";
import GameScreen from "./components/GameScreen";
import HowToPlay from "./components/HowToPlay";

function App() {
  const [word, setWord] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState(false);
  const [players, setPlayers] = useState(4);
  const [imposters, setImposters] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [playerArray, setPlayerArray] = useState([]);
  const [instructions, setInstructions] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [showCategory, setShowCategory] = useState(() => {
    const storedShowCategory = localStorage.getItem("showCategory");
    return storedShowCategory !== null ? storedShowCategory === "true" : true;
  });
  const defaultWordArrays = {
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
        "Michael Jordan",
        "Barry Bonds",
        "Kobe Bryant",
        "Muhammad Ali",
        "Tiger Woods",
        "Michael Schumacher",
        "Diego Maradona",
        "Mia Hamm",
        "Wayne Gretzky",
        "Babe Ruth",
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
        "Emma Stone",
        "Justin Bieber",
        "Selena Gomez",
        "Rihanna",
        "Chris Pratt",
        "Ariana Grande",
        "Zac Efron",
        "Emma Watson",
        "Nicki Minaj",
        "Ed Sheeran",
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
        "Aquaman",
        "Flash",
        "Green Lantern",
        "Wolverine",
        "Deadpool",
        "Green Arrow",
        "Black Widow",
        "Doctor Strange",
        "The Flash",
        // Add more superheroes as needed
      ],
    },
    wrestlers: {
      name: "Wrestlers",
      include: true,
      words: [
        "Stone Cold Steve Austin",
        "The Rock",
        "Triple H",
        "The Undertaker",
        "John Cena",
        "Brock Lesnar",
        "Roman Reigns",
        "Shawn Michaels",
        "Hulk Hogan",
        "Randy Orton",
        "Bret Hart",
        "Kurt Angle",
        "CM Punk",
        "Daniel Bryan",
        "AJ Styles",
        "Seth Rollins",
        "Dean Ambrose",
        "Edge",
        "Rey Mysterio",
        "Chris Jericho",
        "Goldberg",
        // Add more wrestlers as needed
      ],
    },
    foods: {
      name: "Foods",
      include: true,
      words: [
        "Pizza",
        "Burger",
        "Sushi",
        "Tacos",
        "Pasta",
        "Steak",
        "Chicken Wings",
        "Ice Cream",
        "French Fries",
        "Chocolate",
        "Sandwich",
        "Salad",
        "Ramen",
        "Cake",
        "Pancakes",
        "Donuts",
        "Burrito",
        "Hotdog",
        "Lasagna",
        "Fried Chicken",
        // Add more foods as needed
      ],
    },
    sitcoms: {
      name: "Sitcoms",
      include: true,
      words: [
        "Friends",
        "The Office",
        "Parks and Recreation",
        "Brooklyn Nine-Nine",
        "How I Met Your Mother",
        "The Big Bang Theory",
        "Seinfeld",
        "Modern Family",
        "The Simpsons",
        "Arrested Development",
        "Scrubs",
        "Frasier",
        "Cheers",
        "Two and a Half Men",
        "That '70s Show",
        "The Fresh Prince of Bel-Air",
        "Family Guy",
        "30 Rock",
        "The Good Place",
        "South Park",
        "New Girl",
        // Add more sitcoms as needed
      ],
    },
    animals: {
      name: "Animals",
      include: true,
      words: [
        "Dog",
        "Cat",
        "Elephant",
        "Tiger",
        "Lion",
        "Giraffe",
        "Horse",
        "Monkey",
        "Penguin",
        "Dolphin",
        "Kangaroo",
        "Panda",
        "Zebra",
        "Bear",
        "Wolf",
        "Rabbit",
        "Squirrel",
        "Fox",
        "Owl",
        "Octopus",
        "Killer Whale",
        // Add more animals as needed
      ],
    },
    sportsTeams: {
      name: "Sports Teams",
      include: true,
      words: [
        "Los Angeles Lakers",
        "New York Yankees",
        "Dallas Cowboys",
        "Manchester United",
        "Real Madrid",
        "Barcelona",
        "New England Patriots",
        "Chicago Bulls",
        "Green Bay Packers",
        "Boston Red Sox",
        "Los Angeles Dodgers",
        "Liverpool FC",
        "Golden State Warriors",
        "Chicago Cubs",
        "New York Giants",
        "Manchester City",
        "Dallas Mavericks",
        "Miami Heat",
        "Toronto Raptors",
        "Seattle Seahawks",
        // Add more sports teams as needed
      ],
    },
    ufcFighters: {
      name: "UFC Fighters",
      include: true,
      words: [
        "Conor McGregor",
        "Khabib Nurmagomedov",
        "Jon Jones",
        "Anderson Silva",
        "Georges St-Pierre",
        "Daniel Cormier",
        "Nate Diaz",
        "Amanda Nunes",
        "Ronda Rousey",
        "Max Holloway",
        "Israel Adesanya",
        "Tyron Woodley",
        "Tony Ferguson",
        "Dustin Poirier",
        "Stipe Miocic",
        "Valentina Shevchenko",
        "Henry Cejudo",
        "Francis Ngannou",
        "Jose Aldo",
        "Rose Namajunas",
        "Yoel Romero",
        "Tito Ortiz",
        "Chuck Liddell",
        "Randy Couture",
        "Lyoto Machida",
        "Colby Covington",
        // Add more UFC fighters as needed
      ],
    },
    nineties: {
      name: "90s Nostalgia",
      include: true,
      words: [
        "Nirvana",
        "The Fresh Prince of Bel-Air",
        "Tamagotchi",
        "Super Nintendo",
        "Boy Bands",
        "Dial-up Internet",
        "The Spice Girls",
        "Furby",
        "Game Boy",
        "Pogs",
        "Lisa Frank",
        "Power Rangers",
        "Beanie Babies",
        "Grunge Fashion",
        "Jurassic Park",
        "Scrunchies",
        "Saved by the Bell",
        "Walkman",
        "Rollerblades",
        "Boombox",
        // Add more 90s nostalgia items as needed
      ],
    },
    twoThousands: {
      name: "2000s Nostalgia",
      include: true,
      words: [
        "Britney Spears",
        "Harry Potter",
        "Nintendo Wii",
        "MTV Cribs",
        "Razor Scooters",
        "PlayStation 2",
        "MSN Messenger",
        "American Idol",
        "The OC",
        "Eminem",
        "High School Musical",
        "MySpace",
        "SpongeBob SquarePants",
        "The Lord of the Rings",
        "Rihanna",
        "Paris Hilton",
        "Disney Channel Original Movies",
        "iPod",
        "Spider-Man (Tobey Maguire)",
        "The Sims",
        // Add more 2000s nostalgia items as needed
      ],
    },
    countries: {
      name: "Countries",
      include: true,
      words: [
        "United States",
        "Canada",
        "United Kingdom",
        "Australia",
        "Germany",
        "France",
        "Italy",
        "Spain",
        "Japan",
        "China",
        "Brazil",
        "India",
        "Russia",
        "South Korea",
        "Mexico",
        "Argentina",
        "South Africa",
        "Nigeria",
        "Egypt",
        "Saudi Arabia",
        // Add more countries as needed
      ],
    },
    disney: {
      name: "Disney Characters and Movies",
      include: true,
      words: [
        // Main Disney Characters
        "Mickey Mouse",
        "Minnie Mouse",
        "Donald Duck",
        "Daisy Duck",
        "Goofy",
        "Pluto",
        "Cinderella",
        "Snow White",
        "Ariel",
        "Belle",
        "Jasmine",
        "Mulan",
        "Simba",
        "Nala",
        "Timon",
        "Pumbaa",
        "Aladdin",
        "Genie",
        "Pocahontas",
        "Tiana",
        "Elsa",
        "Anna",
        "Olaf",
        "Woody",
        "Buzz Lightyear",
        "Jessie",
        "Sully",
        "Mike Wazowski",
        "Mr. Incredible",
        "Elastigirl",
        "Jack Sparrow",
        "Captain Jack Sparrow",
        // Popular Disney Movies
        "The Lion King",
        "Aladdin",
        "Beauty and the Beast",
        "Frozen",
        "Toy Story",
        "Finding Nemo",
        "The Little Mermaid",
        "Cinderella",
        "Mulan",
        "Pocahontas",
        "Moana",
        "The Incredibles",
        "Zootopia",
        "Tangled",
        "Brave",
        "Wreck-It Ralph",
        "Coco",
        "Inside Out",
        "Ratatouille",
        "The Princess and the Frog",
        "Up",
        "Wall-E",
        // Add more Disney main characters and movies as needed
      ],
    },
  };

  const hasNewKeys = (defaultObj, storedObj) => {
    const defaultKeys = Object.keys(defaultObj);
    const storedKeys = storedObj ? Object.keys(storedObj) : [];
    return defaultKeys.some((key) => !storedKeys.includes(key));
  };

  const [wordArrays, setWordArrays] = useState(() => {
    const storedWordArrays = JSON.parse(localStorage.getItem("wordArrays"));
    return hasNewKeys(defaultWordArrays, storedWordArrays) ? defaultWordArrays : storedWordArrays || defaultWordArrays;
  });

  useEffect(() => {
    const storedWordArrays = JSON.parse(localStorage.getItem("wordArrays"));
    const wordArraysKeys = Object.keys(wordArrays);
    const storedKeys = storedWordArrays ? Object.keys(storedWordArrays) : [];

    // Check if there are new categories or words added
    if (!isEqual(wordArraysKeys, storedKeys)) {
      // Update localStorage
      localStorage.setItem("wordArrays", JSON.stringify(wordArrays));
    }
  }, [wordArrays]);

  // Function to check if arrays are equal
  const isEqual = (array1, array2) => {
    if (array1.length !== array2.length) return false;
    for (let i = 0; i < array1.length; i++) {
      if (array1[i] !== array2[i]) return false;
    }
    return true;
  };

  // Function to check if defaultWordArrays has new keys compared to storedWordArrays

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
  // Function to toggle instructions on
  const toggleInstructionsOn = () => {
    setInstructions(true);
  };

  // Function to toggle instructions off
  const toggleInstructionsOff = () => {
    setInstructions(false);
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
  } else if (instructions) {
    return <HowToPlay toggleInstructionsOff={toggleInstructionsOff} />;

    // add instructions here
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
          toggleInstructionsOn={toggleInstructionsOn}
        />
      </div>
    );
  }
}

export default App;
