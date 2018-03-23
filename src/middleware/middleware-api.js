import axios from 'axios';

// Based on React Next 2017 - Middleware lecture by Boris Dinkevich
// https://github.com/500tech/middleware-lecture

const apiMiddleware = ({ dispatch, getState }) => next => action => {
    // Only handle actions with { meta: { middlewaretypes: 'api'} }
    if (skipProcessing(action)) {
        return next(action);
    }

    const { url, init, success, error } = action.payload;

    console.log("apiMiddleware request started, url: ", url, ", action: ", action, ", state: ", getState());

    dispatch(init());

    axios.get(url)
        .then(response => {
            console.log("apiMiddleware succeeded: ", response);
            setTimeout(t => {
                dispatch(success(response))
            }, 2000);
        })
        .catch(function (err) {
            console.error("apiMiddleware error occurred: ", err);
            dispatch(error(err));
        });
};

const skipProcessing = (action) => {
    if (!action.meta || !action.meta.middlewaretypes) {
        return true;
    }

    if (Array.isArray(action.meta.middlewaretypes)) {
        if (!action.meta.middlewaretypes.find(ele => ele.toLowerCase() === "api")) {
            return true;
        }
    }
    else {
        if (action.meta.middlewaretypes.toLowerCase() !== "api") {
            return true;
        }
    }
    return false;
}

export default apiMiddleware;