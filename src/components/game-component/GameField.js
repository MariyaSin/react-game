import React, { useEffect, useRef, useState } from 'react';

import GameProfile from '../profile-component/GameProfile';
import Storage from '../../utils/Storage';
import { WINDOW_WIDTH, WINDOW_HEIGHT, BALL_RADIUS } from '../../utils/constants';
import { newShelfsData } from './NewShelfsData';

let speeds;
let speedCorrection = 0;
let shelfs = newShelfsData;
let xBall = Math.floor(WINDOW_WIDTH * 0.3);
let yBall = shelfs[shelfs.length - 1].y - 50;
let ballOnShelf = false;
let ballDirectionIsUp = false;
let ballUpTo = 0;
let hotKeys = Storage.GetData('HotKeys');
let timeout = false;
let Context;

export default function GameField(props) {
    speeds = props.speeds;
    const [isGaming, setIsGaming] = useState(true);
    const [failures, setFailures] = useState(0);

    const canvas = useRef();
    useEffect(() => {
        const context = canvas.current.getContext("2d");

        Context = () => {
            context.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
            context.beginPath();
            context.arc(xBall, yBall, BALL_RADIUS, 0, Math.PI * 2, false);
            context.fill();
            ballOnShelf = false;

            for (let i = shelfs.length - 1; (0 <= i) && (shelfs[i].x < WINDOW_WIDTH); i--) {
                context.fillRect(shelfs[i].x, shelfs[i].y, shelfs[i].width, shelfs[i].height);
                if ((shelfs[i].x <= xBall) && 
                (xBall <= shelfs[i].x + shelfs[i].width) && 
                (yBall + BALL_RADIUS === shelfs[i].y)) {
                    ballOnShelf = true;
                }
            }
            if (ballDirectionIsUp) {
                yBall === ballUpTo ? (ballDirectionIsUp = false) : yBall -= speeds.ballUp;
            } else if (!ballOnShelf) {
                yBall += speeds.ballDown;
            }
            if (shelfs[shelfs.length - 1].x + shelfs[shelfs.length - 1].width < 0) {
                shelfs.pop();
            }
            if ((shelfs[0].x + shelfs[0].width > WINDOW_WIDTH) && (yBall - BALL_RADIUS < WINDOW_HEIGHT)) {
                shelfs.forEach((shelf) =>  shelf.x -= speeds.shelf + speedCorrection);
                if (!timeout) {
                    requestAnimationFrame(Context);
                }
            }
            if (yBall - BALL_RADIUS >= WINDOW_HEIGHT) {
                shelfs = Storage.GetData('Shelfs');
                yBall = shelfs[shelfs.length - 1].y - 50;
                setFailures(failures => failures + 1);
                requestAnimationFrame(Context);
            }
            if ((shelfs[0].x < 100) && (yBall + BALL_RADIUS === shelfs[0].y)) {
                setIsGaming(false);
                props.isFinish(0);
                return;
            }
        }
        return Context();
    })

    return <div className={"game-background-" + props.level}>
        <canvas ref={canvas} width={WINDOW_WIDTH} height={WINDOW_HEIGHT} ></canvas>
        <GameProfile isGaming={isGaming} failures={failures} />
    </div>
}

document.addEventListener('keypress', (e) => {
    switch(e.code) {
        case hotKeys.jump: Jump(300); return;
        case hotKeys.shortJump: Jump(100); return;
        case hotKeys.back: KeyUpListener(-1); return;
        case hotKeys.faster: KeyUpListener(1); return;
        case hotKeys.pause: PauseHandler(); return;
        default: break;
    }
})

function PauseHandler() {
    timeout = !timeout;
    if (!timeout) {
        Context();
    }
}

function KeyUpListener(value) {
    speedCorrection = value;
    const template = () => {
        speedCorrection = 0;
        document.removeEventListener('keyup', template);
    }
    document.addEventListener('keyup', template);
}

function Jump(jumpHeight) {
    if (ballOnShelf) {
        ballUpTo = yBall - jumpHeight;
        ballDirectionIsUp = true;
    }
}


