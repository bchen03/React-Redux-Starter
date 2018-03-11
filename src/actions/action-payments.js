'use strict';

export const changePaymentType = (paymentType) => {
    console.log('changePaymentType action called w/ type: ', paymentType);
    return {
        type: "CHANGE_PAYMENT_TYPE",
        paymentType
    };
}