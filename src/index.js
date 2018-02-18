'use strict';

import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux';  
import thunkMiddleware from 'redux-thunk';

import App from "./components/app";
import {allReducers} from './reducers/reducer-all';
import {fetchPosts} from './actions/action-posts';

import './css/styles.scss';

// Add support for Redux DevTools extension 
// Install Redux devtools for your browser first
// https://github.com/zalmoxisus/redux-devtools-extension#usage
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Redux store
const store = createStore(
  allReducers,            // top level reducer
  {},                     // initial state
  composeEnhancers(       
    applyMiddleware(       
        thunkMiddleware   // redux-thunk for async dispatch
    )
  )
);

// Display updates to store
// This is normal Redux way to know when store has changed
// React/Redux uses connect() to map dispatch actions to React container props
store.subscribe(() => {
  console.log("Store updated: ", store.getState());
});

// Initial react render
// Redux needs <Provider> tag to associate redux store with all components
ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);

// Dispatch initial action to load movies in <App> container
// Look at app.js for another way of dispatching actions through props
//store.dispatch(fetchPosts()).then(() => console.log("Dispatch initial fetchPosts: ", store.getState()))
