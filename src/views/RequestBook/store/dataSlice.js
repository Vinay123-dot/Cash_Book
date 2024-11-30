import { createSlice } from "@reduxjs/toolkit";

const intialHistoryData = {
    book_type: null,
    history_type: null,
    terminal_id : null,
    book_name : "",
    fromDate: "",
    toDate: "",
};

const dataSlice = createSlice({
  name: "requestBook/data",
  initialState: {
    reqHistoryData: intialHistoryData,
    historyArr : [],
    approvedDates : [],
    requstedDates : [],
  },
  reducers: {
    setReqHistoryData : (state, action) => {
      state.reqHistoryData = { ...intialHistoryData, ...action.payload };
    },
    setHistoryArr : (state,action) => {
        state.historyArr = action.payload;
    },
    setApprovedDates : (state,action) => {
      state.approvedDates = action.payload;
    },
    setRequestedDates : (state,action) => {
      state.requstedDates = action.payload;
    },
    setClearAllHistoryFields : (state,action) => {
      state.historyArr = [];
      state.reqHistoryData = {...intialHistoryData};
    }
  },
});

export const {
    setReqHistoryData,
    setHistoryArr,
    setApprovedDates,
    setClearAllHistoryFields,
    setRequestedDates
} = dataSlice.actions;

export default dataSlice.reducer;

