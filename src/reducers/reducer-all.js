'use strict';

import {combineReducers} from 'redux';
import {postsReducer} from './reducer-posts';


// Top-level Redux store state
// Maps individual reducer states into one top-level state object
// React/Redux containers will use mapStateToProps() to map the top-level state object to container 
// props, i.e., in app.js, "state.posts" is mapped to combineReducers() "posts: postReducer" result, 
// which is mapped to App's "this.props.posts".
//
// function mapStateToProps(state) {
//     return {
//         posts: state.posts  
//     };
// }
export const allReducers = combineReducers({
    posts: postsReducer
});
