'use strict';

import axios from 'axios';

// JSONPlaceholder is a free online REST service that you can use whenever you need some fake data.
// https://jsonplaceholder.typicode.com/
//
// https://jsonplaceholder.typicode.com/posts returns 100 posts that look like:
// [
//     {
//       "userId": 1,
//       "id": 1,
//       "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
//       "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
//     },
//     {
//       "userId": 1,
//       "id": 2,
//       "title": "qui est esse",
//       "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
//     }, ...
// ]

// Async action to invoke API
// Does initial dispatch to request posts and then a second dispatch when data has been received
export const fetchPosts = () => {
    console.log("fetchPosts called...");
    return function(dispatch) {
        console.log("requestPosts called...");
        dispatch(requestPosts());
        return axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                console.log("receivePosts succeeded: ", response);
                setTimeout(t => {return dispatch(receivePosts(response))}, 2000);
            })
            .catch(function (err) {
                console.error("fetchPosts error occurred: ", err);
            });
    }
};

// Instead of handling async in the action (actions should only say what to do, not how to do it),
// the action sends the request to postMiddleware which handles the actual API call and invokes the
// init, success, error callbacks as appropriate. This is a cleaner design making testing easier.
export const getPosts = () => {
    console.log('getPosts action called...');
    return {
        type: "GET_POSTS",
        meta: {
            middlewaretypes: "api",
        },
        payload: {
            url: 'https://jsonplaceholder.typicode.com/posts',
            init: requestPosts,
            success: receivePosts,
            error: errorPosts
        }
    };
}

const requestPosts = () => {
    console.log('requestPosts action called');
    return {
        type: "POSTS_REQUESTED"
    };
};

const receivePosts = (json) => {
    console.log('receivePosts action called: ', json);
    return {
        type: "POSTS_RECEIVED",
        payload: json
    };
};

const errorPosts = (err) => {
    console.log('errorPosts error called: ', err);
    return {
        type: "POSTS_ERROR",
        payload: String(err)
    }
};

