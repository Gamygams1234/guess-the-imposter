import React, { useState } from "react";

export default function GameScreen(props) {
  const { category, showCategory, currentPlayer, nextPlayer, playerArray } = props;
  const [show, setShow] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  // Function to toggle the show state
  const toggleShow = () => {
    setShow(!show);
  };

  // Function to handle mouse down event
  const handleMouseDown = () => {
    // Start toggling the show state repeatedly when mouse is held down
    const id = setInterval(toggleShow, 200); // Adjust the interval as needed
    // Store the intervalId in state so we can clear it when mouse is released
    setIntervalId(id);
    // Ensure the state is set to true when mouse is down
    setShow(true);
  };

  // Function to handle mouse up event
  const handleMouseUp = () => {
    // Stop toggling the show state when mouse is released
    clearInterval(intervalId);
    setIntervalId(null); // Clear the intervalId from state
    // Ensure the state is set to false when mouse is up
    setShow(false);
  };

  return (
    <div className="game-screen page">
      <div className="top">
        <h1>Player {currentPlayer}</h1>
      </div>

      {show ? (
        <div className="word-display">
          {showCategory && <h3 className = "mb-4">{category}:</h3>}
          <h1>{playerArray[currentPlayer-1]}</h1>
        </div>
      ) : (
        <div className="hidden">
          <h1>Show Word</h1>
        </div>
      )}

      {/* Use onMouseDown and onMouseUp events to trigger the toggle */}
      <button
        className="button show-button"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // In case the user moves the mouse out while holding down
      >
        {show ? "Hide" : "Show"}
      </button>

      <button className="button" onClick={nextPlayer}>
        {currentPlayer===playerArray.length? "Submit": "Next Player"}
      </button>
    </div>
  );
}
