import React, { useState } from 'react';
import GameField from './GameField';
import GameOptions from './GameOptions';
import { ShelfsGenerator } from './ShelfsGenerator';

export default function GamePage(args) {
    const [level, setLevel] = useState(0);

    return (
        <div className="game-page__container">
        {
            !args.runGame ? 
            <GameOptions setLevel={setLevel} setRunGame={args.setRunGame}/> : 
            <GameField 
                level={level}
                shelfs={ShelfsGenerator()}
                runGame={args.runGame} 
                setRunGame={args.setRunGame}
            />
        }
        </div>
    );
}