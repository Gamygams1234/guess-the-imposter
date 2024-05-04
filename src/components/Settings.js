import React from 'react';

export default function Settings(props) {
    return (
      <div className="homepage page">
        <h1>Welcome to the Home Screen!</h1>
        <p>This is your starting point for exploring our app. {props.players}</p>

        {props.word !== "" &&<h2>{props.word}</h2>}

        <button className= "button" onClick={props.generateRandomWord}>Pick Word</button>

      </div>
    );
  
}

