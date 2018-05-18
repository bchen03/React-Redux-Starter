import uuid from 'uuid/v4';

const persistMiddleware = ({ dispatch, getState }) => next => action => {
    console.log("persistMiddleware request started, action: ", action, ", state: ", getState());

    if (action.type === "PERSIST_LOAD") {
        try {
            const payload = sessionStorage.getItem(action.key);
            if (payload) {
                dispatch({ type: "PERSIST_LOAD_SUCCESS", key: action.key, data: JSON.parse(payload) });
            }
        }
        catch (err) {
            dispatch({ type: "PERSIST_LOAD_ERROR", message: err.toString() });
        }
    }
    else if (action.type === "PERSIST_SAVE") {
        try {
            const id = uuid();
            sessionStorage.setItem(id, JSON.stringify(getState()));
            dispatch({ type: "PERSIST_SAVE_SUCCESS", key: id });
        }
        catch (err) {
            dispatch({ type: "PERSIST_SAVE_ERROR", message: err.toString() });
        }
    }
    else if (action.type === "PERSIST_LIST") {

    }
    else
        return next(action);
};

export default persistMiddleware;
