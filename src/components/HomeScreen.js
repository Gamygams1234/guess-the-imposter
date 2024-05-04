import React from 'react';

export default function HomeScreen(props) {
    return (
      <div className="homepage page">

        <div className="top">
        <i className="fa fa-gear"></i> Settings


        </div>
      

        {props.word !== "" &&<h2>{props.word}</h2>}

        <button className= "button" onClick={props.generateRandomWord}>Pick Word</button>

      </div>
    );
  
}

