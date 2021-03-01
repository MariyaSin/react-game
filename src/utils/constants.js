export const WINDOW_WIDTH = window.innerWidth;
export const WINDOW_HEIGHT = window.innerHeight;

export const BALL_RADIUS = 20;

const speeds1 = {ballUp: 4, ballDown: 2, shelf: 2};
const speeds2 = {ballUp: 1, ballDown: 1, shelf: 1};
const speeds3 = {ballUp: 1, ballDown: 1, shelf: 1};



export const LEVELS_PARAM = {
    1: {speeds: speeds1},
    2: {speeds: speeds2},
    3: {speeds: speeds3}
};

export const BALL_AUDIO = new Audio();
BALL_AUDIO.src = '../assets/ball.mp3';

export const SUCCESS_AUDIO = new Audio();
SUCCESS_AUDIO.src = '../assets/success.mp3';

export const DEFAULT_HOT_KEYS = {jump: 'Space', shortJump: 'KeyW', back: 'KeyA', faster: 'KeyD', pause: 'Enter'};