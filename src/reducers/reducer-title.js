'use strict';

export function title(state={}, action) {
    switch (action.type)  {
        case "CHANGE_TITLE_COLOR":
            //return Object.assign({}, state, { color: action.color });
            return { ...state, color: action.color };
    }
    return state;

}