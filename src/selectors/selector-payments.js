'use strict';

export const paymentTypeSelector = state => { 
    console.log("paymentTypeSelector: ", state.paymentTypes);
    return state.paymentTypes.paymentType;
}
