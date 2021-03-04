import React from 'react';
import './styles/game.css';

import Storage from '../../utils/Storage';

export default function GameOptions(args) {
    function ClickHandler(level) {
        args.setLevel(level);
        args.setRunGame(true);
    }

    function CheckDisabled(level) {
        return !(openLevel >= level);
    }

    let openLevel = Storage.GetData('Game-OpenLevel');

    return (
        <div className="game-options__container">
            <button className="game-background-1" onClick={()=> ClickHandler(1)}>Level 1</button>
            <button 
                disabled={CheckDisabled(2)} 
                className="game-background-2" 
                onClick={()=> ClickHandler(2)}>Level 2
            </button>
            <button 
                disabled={CheckDisabled(3)}
                className="game-background-3"
                onClick={()=> ClickHandler(3)}>Level 3
            </button>
        </div>
    )
}