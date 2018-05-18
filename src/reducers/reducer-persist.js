import _ from 'lodash';

function persist(state={}, action) {
    console.log("persist Reducer state:", state, ", action:", action );

    switch (action.type)  {
        case "PERSIST_LOAD_SUCCESS":
            console.log("===> PERSIST_LOAD_SUCCESS: ", state);
            return { ...state, data: action.data, key: action.key };
        case "PERSIST_LOAD_ERROR":
            return { ...state, message: action.message };
        case "PERSIST_SAVE_SUCCESS":
            return { ...state, key: action.key };
        case "PERSIST_SAVE_ERROR":
            return { ...state, message: action.message };
    }
    return state;
};

const persistReducer = (fn) => (state, action) => {
    console.log("==> persistReducer state: ", state, ", action: ", action);
    const newstate = fn(state, action);
    console.log("==> persistReducer new state: ", newstate, ", action: ", action);
    switch (action.type) {
        case "PERSIST_LOAD_SUCCESS": {
            console.log("==> persistReducer PERSIST_LOAD_SUCCESS start: ", newstate);
            const result = _.merge({}, newstate, action.data, { persist: { key: action.key }} );
            console.log("==> persistReducer PERSIST_LOAD_SUCCESS end: ", result);
            return result;
        }
        case "PERSIST_LOAD_ERROR": {
            const result = { ...newstate, persist: { message: action.message } };
            console.log("==> persistReducer PERSIST_LOAD_ERROR: ", result);
            return result;

        }
        case "PERSIST_SAVE_SUCCESS": {
            const result = { ...newstate, persist: { key: action.key } };
            console.log("==> persistReducer PERSIST_SAVE_SUCCESS: ", result);
            return result;
        }
        case "PERSIST_SAVE_ERROR": {
            const result = { ...newstate, persist: { message: action.message } };
            console.log("==> persistReducer PERSIST_SAVE_ERROR: ", result);
            return result;
        }
    }
    return newstate;
}

export {persist, persistReducer};