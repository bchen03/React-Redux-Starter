'use strict';

import React from "react";
import {mapProps, withState, compose, branch, renderComponent} from 'recompose';


// mapProps example - Appends "!!!" to text prop
const MessageComponent = props => (<span>{ props.text }</span>)
const MessageHoc = mapProps(props => ({ text: props.text + "!!!" }))(MessageComponent);

// withState - Toggle 'color' boolean prop and display
// withState injects state/updater function into props - use destructuring here to access props
const ColorToggle = ({color, setColor}) => {
    return (
        <span>
            <span><button onClick={() => setColor(!color)}>Color me</button></span>
            <span style={{marginLeft: "10px"}}>{ color === true ? "red" : "black" }</span>
        </span>
    );
};

// 'color' is state, 'setColor' is function to update state, true is initial value
const ColorHoc = withState('color', 'setColor', true)(ColorToggle);


// Payments - uses branch, compose, and renderComponent
const VisaPayment = props => <span>Visa Payment</span>;
const MasterCardPayment = props => <span>Mastercard Payment</span>;
const CashPayment = props => <span>Cash Payment</span>;
const SelectPayment = props => <span>* Select Payment Option</span>;

const PaymentTypes = [
    { when: ({paymentType}) => paymentType === "VISA", then: VisaPayment },
    { when: ({paymentType}) => paymentType === "MASTERCARD", then: MasterCardPayment },
    { when: ({paymentType}) => paymentType === "CASH", then: CashPayment },
];

const Payments = paymentTypes => 
    compose(...paymentTypes.map(({then, when}) => 
        branch(when, renderComponent(then))
    ));

const enhance = compose(Payments(PaymentTypes));
const PaymentView = enhance(SelectPayment);


export { MessageHoc, ColorHoc, PaymentView };