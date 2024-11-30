import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
    name : "paymentBook/state",
    initialState : {
        PaymentModal : false,
        PaymentModalMsg : "",
    },
    reducers : {
        setPaymentManageModal : (state,action) => {
            state.PaymentModal = action.payload.PaymentModal;
            state.PaymentModalMsg = action.payload.PaymentModalMsg
        }
    }
});

export const{
    setPaymentManageModal
} = stateSlice.actions;

export default stateSlice.reducer;