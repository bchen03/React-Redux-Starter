import _ from 'lodash';

// Lodash
const flipped = _.flip(function() {
    return _.toArray(arguments);
});

const mergeTest = () => {
    const lodashReducer = (config, reducerFn) => (state, action) => {
        const result = reducerFn(state, action);
        if (action.type === "PERSIST_LOAD_SUCCESS") {
            return _.merge({}, result, action.data);
        }
        return result;
    }

    // Tests
    const innerReducer = (state, action) => { 
        return { 
            a: { 
                foo: "foo", 
                bar: "bar",
                zzz: {
                    sss: "sss",
                    ccc: {
                        ddd: "ddd"
                    }
                }
            }, 
            b: { 
                ack: "ack" 
            }, 
            c: { 
                zoo: "zoo" 
            } 
        } 
    }

    const reducer = lodashReducer({ keys: ["a", "b", "c"] }, innerReducer);
    const reducerResult = reducer(
        {}, 
        { 
            type: "PERSIST_LOAD_SUCCESS", 
            data: { 
                a: { 
                    foo: "foo1", 
                    bla: "bla", 
                    zzz: {
                        ssse: "sss1",
                        ccc: {
                            ddde: "ddd1"
                        }
                        }
                }, 
                c: { 
                    zoo: "zoo1", 
                    bird: "bird" 
                } 
            } 
        }
    );
    console.log("==> LODASH reducerResult: ", reducerResult);
}


function lodashTests() {
    console.warn("Lodash Tests");
    console.warn("==> flipped (1,2,3,4,5): ", flipped(1,2,3,4,5));

    mergeTest();
}

export {lodashTests};

