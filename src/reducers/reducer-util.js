
// Load persistent state to redux
export function loadPersist(state={}, action, key) {
    console.log(`load ${key} Reducer state:`, state, ", action:", action );
    if (action.type === "PERSIST_LOAD_SUCCESS") {
        return { ...state, ...action.data[key] };
    }
    return state;
}


const persistReducer = (config, reducerFn) => (state, action) => {
    const result = reducerFn(state, action);
    if (action.type === "PERSIST_LOAD_SUCCESS") {
        return config.keys.reduce((acc, key) => {
            return action.data[key] ? { ...acc, [key]: { ...result[key], ...action.data[key] } } : acc;
        }, result);
    }
    return result;
}

// Tests
const innerReducer = (state, action) => { return { a: { foo: "foo", bar: "bar" }, b: { ack: "ack" }, c: { zoo: "zoo" } } }
const reducer1 = persistReducer({ keys: ["a", "b", "c"] }, innerReducer);
const reducer1Result = reducer1({}, { type: "PERSIST_LOAD_SUCCESS", data: { a: { foo: "foo1", bla: "bla" }, c: { zoo: "zoo1", bird: "bird" } } });
console.log("==> reducer1Result: ", reducer1Result);