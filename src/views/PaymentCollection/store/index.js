import { combineReducers } from "@reduxjs/toolkit";
import PaymentState from "./stateSlice";
import PaymentData from "./dataSlice";

const createPaymentReducer = combineReducers({
    PaymentState,
    PaymentData
});

export default createPaymentReducer;