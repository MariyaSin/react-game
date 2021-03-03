/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';

import GameProfile from '../profile-component/GameProfile';
import Storage from '../../utils/Storage';
import { WINDOW_WIDTH, WINDOW_HEIGHT, BALL_RADIUS } from '../../utils/constants';
import { newShelfsData } from './NewShelfsData';

export default function GameField(args) {
    let hotKeys = Storage.GetData('HotKeys');
    let speedFactor = 0;
    let shelfs = newShelfsData;
    let xBall = Math.floor(WINDOW_WIDTH * 0.3);
    let yBall = shelfs[shelfs.length - 1].y - 50;
    let ballOnShelf = false;
    let ballDirectionIsUp = false;
    let ballUpTo = 0;
    let timeout = false;
    let Context;
    //let failures = 0;

    document.addEventListener('keypress', (key) => {
        switch(key.code) {
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

    const [runGame, setRunGame] = useState(true);
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
                yBall === ballUpTo ? (ballDirectionIsUp = false) : yBall -= args.speeds.ballUp;
            } else if (!ballOnShelf) {
                yBall += args.speeds.ballDown;
            }
            if (shelfs[shelfs.length - 1].x + shelfs[shelfs.length - 1].width < 0) {
                shelfs.pop();
            }
            if ((shelfs[0].x + shelfs[0].width > WINDOW_WIDTH) && (yBall - BALL_RADIUS < WINDOW_HEIGHT)) {
                shelfs.forEach((shelf) =>  shelf.x -= args.speeds.shelf + speedFactor);
                if (!timeout) {
                    requestAnimationFrame(Context);
                }
            }
            if (yBall - BALL_RADIUS >= WINDOW_HEIGHT) {
                shelfs = Storage.GetData('Shelfs');
                yBall = shelfs[shelfs.length - 1].y - 50;
                setFailures(failures => failures + 1)
                requestAnimationFrame(Context);
            }
            if ((shelfs[0].x < 100) && (yBall + BALL_RADIUS === shelfs[0].y)) {
                setRunGame(false);
                args.isFinish(0);
                return;
            }
        }
        Context();
        return () => cancelAnimationFrame(Context);
    }, [args.level])

    return <div className={"game-background-" + args.level}>
        <canvas ref={canvas} width={WINDOW_WIDTH} height={WINDOW_HEIGHT} ></canvas>
        <GameProfile runTimer={runGame} failures={failures} level={args.level} />
    </div>
}