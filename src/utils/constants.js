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
