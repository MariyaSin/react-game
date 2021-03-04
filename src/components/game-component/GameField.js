import React, { useEffect, useRef, useState } from 'react';

import GameProfile from '../profile-component/GameProfile';
import Popup from './Popup';
import Storage from '../../utils/Storage';
import { WINDOW_WIDTH, WINDOW_HEIGHT, BALL_RADIUS } from '../../utils/constants';
import { LEVELS_SPEEDS } from '../../utils/constants';

export default function GameField(args) {
    let shelfs = Storage.GetData('Game-CurrentShelfs');
    let hotKeys = Storage.GetData('Settings-HotKeys');
    let speedFactor = 0;
    let ballOnShelf = false;
    let ballDirectionIsUp = false;
    let ballUpTo = 0;
    let xBall = Math.floor(WINDOW_WIDTH * 0.3);
    let yBall = shelfs[shelfs.length - 1].y - 50;
    
    const [failures, setFailures] = useState(0);
    const [pause, setPause] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);

    document.addEventListener('keypress', (key) => {
        switch(key.code) {
            case hotKeys.jump: Jump(300); return;
            case hotKeys.shortJump: Jump(100); return;
            case hotKeys.back: KeyUpListener(-1); return;
            case hotKeys.faster: KeyUpListener(1); return;
            case hotKeys.pause: setPause(!pause); return;
            default: break;
        }
    })

    function KeyUpListener(value) {
        speedFactor = value;
        const SetFactor = () => {
            speedFactor = 0;
            document.removeEventListener('keyup', SetFactor);
        }
        document.addEventListener('keyup', SetFactor);
    }

    function Jump(jumpHeight) {
        if (ballOnShelf) {
            ballUpTo = yBall - jumpHeight;
            ballDirectionIsUp = true;
        }
    }

    const canvas = useRef();

    useEffect(() => {
        const context = canvas.current.getContext("2d");
        let Animation = setInterval(() => {
            context.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
            context.beginPath();
            context.arc(xBall, yBall, BALL_RADIUS, 0, Math.PI * 2, false);
            context.fill();
            ballOnShelf = false;

            for (let i = 0; i < shelfs.length; i++) {
                if (0 < shelfs[i].x + shelfs[i].width && shelfs[i].x < WINDOW_WIDTH) {
                    context.fillRect(shelfs[i].x, shelfs[i].y, shelfs[i].width, shelfs[i].height);
                    if ((shelfs[i].x <= xBall) && 
                        (xBall <= shelfs[i].x + shelfs[i].width) && 
                        (yBall + BALL_RADIUS === shelfs[i].y)) {
                        ballOnShelf = true;
                    }
                }
                shelfs[i].x -= LEVELS_SPEEDS[args.level].shelf + speedFactor;
            }

            if (ballDirectionIsUp) {
                yBall === ballUpTo ? (ballDirectionIsUp = false) : yBall -= LEVELS_SPEEDS[args.level].ballUp;
            } else if (!ballOnShelf) {
                yBall += LEVELS_SPEEDS[args.level].ballDown;
            }

            if (yBall - BALL_RADIUS >= WINDOW_HEIGHT) {
                yBall = shelfs[0].y - 50;
                shelfs = Storage.GetData('Game-CurrentShelfs');
                setFailures(failure => failure + 1);
            }
            if ((shelfs[shelfs.length - 1].x < 50) && (yBall + BALL_RADIUS <= shelfs[shelfs.length - 1].y)) {
                console.log("finish")
                Storage.AddData('Game-RecordsData', Storage.GetData('Game-CurrentProfile'));
                Storage.SetData('Game-OpenLevel', Storage.GetData('Game-OpenLevel') + 1);
                setOpenPopup(show => show = true);
                clearInterval(Animation);
                const resetGame = setTimeout(() => {
                    args.setRunGame(false); 
                    clearTimeout(resetGame)
                }, 3000);
            }
        }, 30)
        return () => clearInterval(Animation);
    }, []);

    return (
    <div className={"game-background-" + args.level}>
        <canvas ref={canvas} width={WINDOW_WIDTH} height={WINDOW_HEIGHT} ></canvas>
        {
            openPopup ?
            <Popup showPopup={openPopup} /> :
            <GameProfile pause={pause} failures={failures} level={args.level} />
        }
    </div>
    )
}