import {loadPersist} from './reducer-util';

export function paymentTypes(state=defaultState, action) {
    console.log("paymentTypes Reducer state:", state, ", action:", action );
    switch (action.type)  {
        case "CHANGE_PAYMENT_TYPE":
            //return Object.assign({}, state, { color: action.color });
            return { ...state, paymentType: action.paymentType };
    }
    //return loadPersist(state, action, "paymentTypes");
    return state;
}

const defaultState = {
    paymentType: ""
}