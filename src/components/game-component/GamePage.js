import React, { useState } from 'react';
import GameField from './GameField';
import GameOptions from './GameOptions';
import { LEVELS_PARAM } from '../../utils/constants';

export default function GamePage(args) {
    const [level, setLevel] = useState(0);
    
    return (
        <div className="game-page__container">
        {
            !args.runGame ? 
            <GameOptions setLevel={setLevel} setRunGame={args.setRunGame}/> : 
            <GameField 
                speeds={LEVELS_PARAM[level].speeds} 
                level={level}
                runGame={args.runGame} 
                setRunGame={args.setRunGame} 
            />
        }
        </div>
    );
    
}