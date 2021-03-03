import React from 'react';
import './styles/game.css';

export default function GameOptions(args) {
    function ClickHandler(level) {
        args.setLevel(level);
        args.setRunGame(true);
    }

    return (
        <div className="game-options__container">
            <button className="game-background-1" onClick={()=> ClickHandler(1)}>Level 1</button>
            <button className="game-background-2" onClick={()=> ClickHandler(2)}>Level 2</button>
            <button className="game-background-3" onClick={()=> ClickHandler(3)}>Level 3</button>
        </div>
    )
}