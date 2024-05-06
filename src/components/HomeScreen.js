import React from "react";

export default function HomeScreen(props) {
  const { imposters, players, incrementPlayers, decrementPlayers, incrementImposters, decrementImposters } = props;
  return (
    <div className="homepage page">
      <div className="top">
        <div className="inline">
         
          <i onClick={props.changeSettings} className="fa fa-gear white-text"></i> <h2>Settings</h2>
        </div>
      </div>

      <div className="hero">
        <h1>Guess the Imposter!</h1>
      </div>

      <div className="indicator">
        <h3>Players:</h3>
        <div className="buttons">
          <button onClick={decrementPlayers}>-</button>
          <span>{players}</span>
          <button onClick={incrementPlayers}>+</button>
        </div>
      </div>
      <div className="indicator">
        <h3>Imposters:</h3>
        <div className="buttons">
          <button onClick={decrementImposters}>-</button>
          <span>{imposters}</span>
          <button onClick={incrementImposters}>+</button>
        </div>
      </div>

      <button className="button" onClick={props.startGamePlay}>
        Start Game
      </button>
    </div>
  );
}
