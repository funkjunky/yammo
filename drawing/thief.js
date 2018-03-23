import spritesheet from './spritesheet.js';
import thiefPng from '../res/thief.png';

export default (ctx, state) => {
    const thief = key => getState(key, state);

    //TODO: action direction etc. are all going to likely be the same for every sprite? it's also very long
    ctx.drawImage(...thiefSprite[thief('action')][thief('direction')](thief('progress'), thief('x'), thief('y')));
};

//TODO: this function should be somewhere else.
// first check game state, then graphics state,then use default.
const getState = (key, state, _default = 0) => state.game[key] || state.graphics[key] || _default;

let image = new Image();
image.src = thiefPng;
const thiefSpritesheet = spritesheet(image, 32, 64);
const thiefSprite = {
    attack: {
        up:     thiefSpritesheet([0, 1, 2, 3]),
        down:   thiefSpritesheet([4, 5, 6, 7]),
        left:   thiefSpritesheet([8, 9, 10]),
        right:  thiefSpritesheet([11, 12, 13]),
    },
    idle: {
        left:   thiefSpritesheet([14]),
        right:  thiefSpritesheet([15]),
        down:   thiefSpritesheet([16]),
        up:     thiefSpritesheet([0]),
    },
    walk: {
        up: ctx => thiefSpritesheet([17, 18, 19, 20, 21, 20]),
        left: ctx => thiefSpritesheet([22, 23, 24, 25, 26, 27, 28, 27]),
        right: ctx => thiefSpritesheet([28, 29, 30, 31, 32, 33, 34, 33]),
        down: ctx => thiefSpritesheet([34, 35, 36, 37, 38, 37]),
    },
};
