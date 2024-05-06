import React, { useState } from "react";

export default function HowToPlay(props) {
  const { toggleInstructionsOff } = props;

  return (
    <div className="page instuctions-page">
      <div className="top">
        <h1>How To Play</h1>
      </div>

      <div className="instructions">
        <section>
          <h2>Objective</h2>
          <p>The objective of the game is to determine who the imposter is.</p>
        </section>
        <section>
          <h2>Setup</h2>
          <p>1. Decide the number of players and imposters.</p>
          <p>2. Click on "Start Game" to begin.</p>
        </section>
        <section>
          <h2>Gameplay</h2>
          <p>1. Player 1 starts by viewing their card and passing it to the next player.</p>
          <p>2. Each player views their card and passes it along until all players have seen their cards.</p>
          <p>3. The table takes turns giving a hint using a word or phrase about the word without revealing it entirely.</p>
          <p>4. Players discuss and try to identify the imposter.</p>
          <p>5. Players can give hints multiple times until there is a final suspect.</p>
        </section>
        <section>
          <h2>Ending the Game</h2>
          <p>If the imposter is correctly identified, the group wins.</p>
          <p>If the imposter avoids detection until the end, the imposter wins.</p>
        </section>
      </div>

      <div className="bottom">
        <button onClick={toggleInstructionsOff} className="button">
          Back To Home
        </button>
      </div>
    </div>
  );
}
