'use strict';

// Pure function that returns new post state object 
// Look at allReducers to see how the top-level Redux store state is created
export function postsReducer(state={}, action) {
    console.log("postsReducer state:", state, ", action:", action );

    switch (action.type)  {
        case "POSTS_REQUESTED":
            //return Object.assign({}, state, { isFetching: true });
            return { ...state, isFetching: true };
        case "POSTS_RECEIVED":
            //return Object.assign({}, state, { isFetching: false, list: action.payload });
            return { ...state, isFetching: false, list: action.payload };
    }
    return state;
};


export function posts(state={}, action) {
    switch (action.type)  {
        case "POSTS_REQUESTED":
            //return Object.assign({}, state, { isFetching: true });
            return { ...state, isFetching: true };
        case "POSTS_RECEIVED":
            //return Object.assign({}, state, { isFetching: false, list: action.payload });
            return { ...state, isFetching: false, list: action.payload };
    }
    return state;
}

export function title(state={}, action) {
    switch (action.type)  {
        case "CHANGE_TITLE_COLOR":
            //return Object.assign({}, state, { color: action.color });
            return { ...state, color: action.color };
    }
    return state;

}