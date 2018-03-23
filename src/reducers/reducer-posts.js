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
        case "POSTS_ERROR":
            return { ...state, isFetching: false, error: action.payload };
    }
    return state;
};


export function posts(state={}, action) {
    return postsReducer(state, action);
}

