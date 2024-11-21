import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name : "requestBook/data",
    intialState : {
        data : ""
    },
    reducers : {
        setFun : (state,action) => {
            state.data = action.payload;
        }
    }
});

export const {
    setFun
} = dataSlice.actions;

export default dataSlice.reducer;

