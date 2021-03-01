import Storage from '../../utils/Storage';
import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../../utils/constants';

function GetRandom(min, max) {
    return Math.floor((Math.random() * (max - min) + max) / 10) * 10;
}

function getNewShelfs() {
    let xStart = Math.floor(WINDOW_WIDTH * 0.4);
    let shelfWidth = 0;
    let maxY = WINDOW_HEIGHT - 300;
    let minY = maxY - 170;
    let shelfs = Array(5).fill({}).map(() => {
        xStart += shelfWidth + GetRandom(-50, 80);
        shelfWidth = GetRandom(50, 250);
        return {x: xStart, y: GetRandom(minY, maxY), width: shelfWidth, height: 20};
    }).reverse();
    shelfs[shelfs.length - 1].width += shelfs[shelfs.length - 1].x;
    shelfs[shelfs.length - 1].x = 0;
    shelfs[0].width = WINDOW_WIDTH;
    Storage.SetData('Shelfs', shelfs);
    return shelfs;
}

export const newShelfsData = getNewShelfs();


