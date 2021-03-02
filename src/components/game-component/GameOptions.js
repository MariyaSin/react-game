import React from 'react';
import './styles/game.css';

export default function GameOptions(props) {
    return (
        <div className="game-options__container">
            <button className="game-background-1" onClick={()=> props.setGameField(1)}>Level 1</button>
            <button className="game-background-2" onClick={()=> props.setGameField(2)}>Level 2</button>
            <button className="game-background-3" onClick={()=> props.setGameField(3)}>Level 3</button>
        </div>
    )
}