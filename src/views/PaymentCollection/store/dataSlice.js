import { createSlice } from "@reduxjs/toolkit";

const intialPaymentData = {
    given_date : null,
    payment_type : null,
    party_code : null,
    history_type: null,
    fromDate: "",
    toDate: "",
    given_amount : null,
    bank_name : "",
    transaction_num : ""
};

const intialBillModalData = {
  showBillModal : false,
  billModalObj : {}
};

const dataSlice = createSlice({
  name: "paymentBook/data",
  initialState: {
    reqPaymentData: intialPaymentData,
    billModalData : intialBillModalData,
    paymentColArray : [],
  },
  reducers: {
    setReqPaymentData : (state, action) => {
      state.reqPaymentData = { ...intialPaymentData, ...action.payload };
    },
    setBillModalData : (state,action) => {
      state.billModalData = {...intialBillModalData,...action.payload};
    },
    setPaymentColArr : (state,action) => {
        state.paymentColArray = action.payload;
    },
    setClearAllPaymentPageFields : (state,action) => {
      console.log("a",action.payload)
      state.reqPaymentData = { ...intialPaymentData};
      state.paymentColArray = [];
    }
  },
});

export const {
    setReqPaymentData,
    setBillModalData,
    setPaymentColArr,
    setClearAllPaymentPageFields
} = dataSlice.actions;

export default dataSlice.reducer;

