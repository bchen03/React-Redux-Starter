import {loadPersist} from './reducer-util';

export function title(state=defaultState, action) {
    console.log("title Reducer state:", state, ", action:", action );
    switch (action.type)  {
        case "CHANGE_TITLE_COLOR":
            //return Object.assign({}, state, { color: action.color });
            return { ...state, color: action.color };
    }
    //return loadPersist(state, action, "title");
    return state;
}

const defaultState = {
    color: ''
}
