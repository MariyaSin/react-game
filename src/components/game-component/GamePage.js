import React, { useState } from 'react';
import GameField from './GameField';
import GameOptions from './GameOptions';
import { LEVELS_PARAM } from '../../utils/constants';

export default function GamePage() {
    const [gameField, setGameField] = useState(0);

    return (
        <div className="game-page__container">
        {
            gameField === 0 ? 
            <GameOptions setGameField={setGameField} /> : 
            <GameField speeds={LEVELS_PARAM[gameField].speeds} level={gameField} isFinish={setGameField} />
        }
        </div>
    );
    
}