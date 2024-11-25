import { createSlice } from "@reduxjs/toolkit";

const intialFilterData = {
    book_type: null,
    history_type: null,
    book_name : "",
    fromDate: "",
    toDate: "",
};

const dataSlice = createSlice({
  name: "requestBook/data",
  initialState: {
    reqHistoryData: intialFilterData,
    historyArr : [],
    approvedDates : []
  },
  reducers: {
    setReqHistoryData : (state, action) => {
      state.reqHistoryData = { ...intialFilterData, ...action.payload };
    },
    setHistoryArr : (state,action) => {
        state.historyArr = action.payload;
    },
    setApprovedDates : (state,action) => {
      state.approvedDates = action.payload;
    }
  },
});

export const {
    setReqHistoryData,
    setHistoryArr,
    setApprovedDates
} = dataSlice.actions;

export default dataSlice.reducer;

