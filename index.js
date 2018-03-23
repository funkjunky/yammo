import { createStore, applyMiddleware } from 'redux';
import { createYieldEffectMiddleware } from 'redux-yield-effect';
import { put, fork, join } from 'redux-yield-effect/lib/effects';
import { tickMiddleware, resumeTicks, pauseTicks } from 'effect-tick';
import { createEntity } from './entities/index.js';
import reducer from './reducer.js';
import graphicsReducer from './graphicsReducer.js';
import metaSelector from 'redux-meta-selector';
import graphics from './graphics.js';
import 'end-polyFills';

document.addEventListener('DOMContentLoaded', start);

if(module.hot) {
    module.hot.accept(() => {
        window.store.replaceReducer(reducer)
        window.cancelAnimationFrame(window.raf);
        window.raf = window.requestAnimationFrame(step)
    });
}

function step(dt) {
    graphics(window.ctx, dt);
    window.requestAnimationFrame(step);
};

function start() {
    window.gameStore = createStore(
        reducer,
        applyMiddleware(
            createYieldEffectMiddleware(),
            tickMiddleware,
            metaSelector
        ),
    );
    window.graphicsStore = createStore(graphicsReducer);

    window.gameStore.dispatch(resumeTicks());

    window.ctx = document.querySelector('canvas').getContext('2d');
    window.raf = window.requestAnimationFrame(step);

    const entity = window.gameStore.dispatch(createEntity({
        x: 100,
        y: 100,
        direction: 'down',
        action: 'idle',
    }));
    console.log('entity: ', entity().id);
    window.graphicsStore.dispatch({ type: 'ADD_ENTITY', id: entity().id });
};
