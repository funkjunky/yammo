//const thiefImage = new Image();
//const thiefSpriteSheet = spritesheet(thiefImage, 48, 96);
//const drawThiefWalkLeft = thiefSpriteSheet([5,6,7,8,9,10]);
//drawThiefWalkLeft(ctx, thief.x, thief.y);
//OR
//drawThief.walk.left(ctx, animationsProgress[thief.id].walk, thief.x, thief.y)
export default (image, frameWidth, frameHeight) => {
    return frameIndices => (frameProgress, x, y) => {
        const index = Math.floor(frameProgress * frameIndices.length)    //ie. 0.4 * 8 (40% through 8 frames)
        const sx = frameWidth * index;
        const sy = 0;
        return [image, sx, sy, frameWidth, frameHeight, x, y, frameWidth, frameHeight];
    };
};
