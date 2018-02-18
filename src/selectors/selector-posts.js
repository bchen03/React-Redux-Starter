'use strict';

import { createSelector } from 'reselect';

// Selectors take Redux state and create component-specific state
// "state" parameter is the Redux state object
// "state.posts": "posts" maps to one of allReducers' key/value state properties
export const postsSelector = state => { 
    console.log("postsSelector: ", state.posts);
    return state.posts;
}

// Returns first 25 posts
export const top25PostsSelector = state => {
    console.log("top25PostsSelector: ", state.posts);
    return filterTop25Posts(state.posts);
};

// This function is NOT doing a deep copy of the list.data array
// To accomplish that use map(item => {}) with Object.assign({}, item), or look a lodash/immutable.js for help
const filterTop25Posts = posts => {
    return { 
        isFetching: posts.isFetching,
        list: {
            data: posts.list && posts.list.data ? posts.list.data.filter((item, index) => index < 25) : null
        }
    };
};

// Returns first 25 posts using Reselect (memoized selector)
// This example won't demonstrate what reselect can do since you'll need another component 
// that doesn't access this portion of the Redux state store to see its benefits
// Also, the posts are retrieved through an API call and is not affected by reselect; 
// reselect only memoizes the computed selector data after the reducer runs
export const top25PostsReSelector = createSelector(
    [postsSelector],
    posts => {
        console.log("top25PostsSelector (using reselect): ", posts);
        return filterTop25Posts(posts);
    }
)

