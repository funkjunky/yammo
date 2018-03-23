import { combineReducers } from 'redux';

export default combineReducers({
    entities: (state={}, action) => {
        switch(action.type) {
            case 'ADD_ENTITY':
                return {
                    ...state,
                    [action.id]: {},
                };
            default:
                return state;
        }
    },
});
