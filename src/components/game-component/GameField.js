import React, {useEffect, useRef} from 'react';

import Storage from '../../utils/Storage';
import { WINDOW_WIDTH, WINDOW_HEIGHT, BALL_RADIUS } from '../../utils/constants';
import { newShelfsData } from './NewShelfsData';

let speeds;
let shelfs = newShelfsData;
let xBall = Math.floor(WINDOW_WIDTH * 0.3);
let yBall = shelfs[shelfs.length - 1].y - 50;
let jumpHeight = 200;
let ballOnShelf = false;
let ballDirectionIsUp = false;
let ballUpTo = 0;


document.addEventListener('keypress', () => {
    if (ballOnShelf) {
        ballUpTo = yBall - jumpHeight;
        ballDirectionIsUp = true;
    }
})

export default function GameField(props) {
    speeds = props.speeds;

    const canvas = useRef();
    useEffect(() => {
        const context = canvas.current.getContext("2d");

        let Context = () => {
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
                yBall === ballUpTo ? ballDirectionIsUp = false : yBall -= speeds.ballUp;
            } else if (!ballOnShelf) {
                yBall += speeds.ballDown;
            }

            if (shelfs[shelfs.length - 1].x + shelfs[shelfs.length - 1].width < 0) {
                shelfs.pop();
            }

            if ((shelfs[0].x + shelfs[0].width > WINDOW_WIDTH) && (yBall - BALL_RADIUS < WINDOW_HEIGHT)) {
                shelfs.forEach((shelf) => shelf.x -= speeds.shelf);
                requestAnimationFrame(Context);
            }
            if (yBall - BALL_RADIUS >= WINDOW_HEIGHT) {
                shelfs = Storage.GetData('Shelfs');
                yBall = shelfs[shelfs.length - 1].y - 50;
                requestAnimationFrame(Context);
            }
            
            if ((shelfs[0].x < 100) && (yBall + BALL_RADIUS === shelfs[0].y)) {
                props.isFinish(0);
            }
        }
        Context();
    })

    return <div className={"game-background-" + props.level}>
        <canvas ref={canvas} width={WINDOW_WIDTH} height={WINDOW_HEIGHT} ></canvas>
    </div>
    
}


