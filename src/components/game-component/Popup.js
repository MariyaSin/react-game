import React from 'react';
import Storage from '../../utils/Storage';

export default function Popup() {
    let gameData = Storage.GetData('Game-CurrentProfile');

    return (
        <div className="popup__container">
            {
                gameData.failures === 0 ? <h2>Excellent!!!</h2> : <h2>Game over</h2>
            }
            <div>
                <span>Time: {gameData.minutes} : {gameData.seconds < 9 ? "0" + gameData.seconds : gameData.seconds}</span>
                <span> Failures: {gameData.failures}</span>
            </div>
        </div>
    )  
}