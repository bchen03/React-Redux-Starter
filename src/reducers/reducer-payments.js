'use strict';

export function paymentTypes(state={}, action) {
    switch (action.type)  {
        case "CHANGE_PAYMENT_TYPE":
            console.log("paymentTypes reducer: ", action.paymentType);
            //return Object.assign({}, state, { color: action.color });
            return { ...state, paymentType: action.paymentType };
    }
    return state;

}