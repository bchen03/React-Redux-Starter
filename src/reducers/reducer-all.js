'use strict';

import {combineReducers} from 'redux';
import {postsReducer, posts} from './reducer-posts';
import {title} from './reducer-title';
import {paymentTypes} from './reducer-payments';


// Top-level Redux store state
// Maps individual reducer states into one top-level state object
//
// To understand how combineReducers works, check out this link: https://redux.js.org/basics/reducers
// So:
//    const reducer = combineReducers({ 
//        posts: postsReducer 
//    }) 
//
// is equivalent to: 
//
//    function reducer(state = {}, action) {
//        return {
//            posts: postsReducer(state.posts, action)
//        };
//    }
//
// Containers will use mapStateToProps() to map the state properties to container props, i.e.,
// combineReducers({ posts: postReducer }) assigns the result of postReducer() to state.posts and 
// in app.js, mapStateToProps() maps it to this.props.posts.
//
// function mapStateToProps(state) {
//     return {
//         posts: state.posts  
//     };
// }

export const allReducers = combineReducers({
    //posts: postsReducer
    posts,          // posts() reducer
    title,           // title() reducer
    paymentTypes     // paymentTypes() reducer
});
