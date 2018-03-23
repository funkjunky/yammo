import thief from './drawing/thief';

export default (ctx, dt) => {
    const gameState = window.gameStore.getState();
    const graphicsState = window.graphicsStore.getState();

    const getState = entity => ({
        game: gameState.entities[entity.id],
        graphics: graphicsState.entities[entity.id],
    });

    //BEGIN ACTUAL GRAPHICS
    ctx.clearRect(0, 0, 640, 480);

    Object.values(window.gameStore.getState().entities).reverse().forEach(entity => {
        ctx.save();
        thief(ctx, getState(entity));
        ctx.restore();
    });
};
