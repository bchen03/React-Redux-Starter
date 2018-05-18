import { createSelector } from 'reselect';

// Selectors take Redux store state and create component-specific slices of state
// "state" parameter is the Redux state object 
// "state.posts": "posts" maps to one of allReducers' key/value state properties
export const postsSelector = state => { 
    return state.posts;
};

// Using reselectjs - This library creates memoized (cached data) selectors.
// When Redux state changes all selectors are called. If you're doing expensive
// calculations/processing on some state it will be recomputed even if the state 
// that changed is unrelated to this calculated state. Reselect will only run
// the calculation if its state has changed (using strict comparison by default - ===)

// Returns first 25 posts using Reselect (memoized selector)
// This example only demonstrates how to use Reselect, this actually is not a good
// use case since the expense of filtering the posts list is offset by the caching 
// of the data, a speed vs memory tradeoff.
export const top25PostsSelector = createSelector(
    [postsSelector],
    posts => {
        console.log("top25PostsSelector (using reselect): ", posts);
        return filterTop25Posts(posts);
    }
);

// This function is NOT doing a deep copy of the list.data array
// To accomplish that use map(item => {}) with Object.assign({}, item), or look a lodash/immutable.js for help
const filterTop25Posts = posts => {
    return { 
        isFetching: posts.isFetching,
        list: {
            data: posts.list && posts.list.data ? posts.list.data.filter((item, index) => index < 25) : null
        },
        error: posts.error
    };
};

