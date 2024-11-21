import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
    name : "requestBook/state",
    intialState : {
        manageRequestModal : false
    },
    reducers : {
        setManageRequestModal : (state,action) => {
            state.manageRequestModal = action.payload;
        }
    }
});

export const {
    setManageRequestModal
} = stateSlice.actions;

export default stateSlice.reducer;