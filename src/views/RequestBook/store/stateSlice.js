import { createSlice } from "@reduxjs/toolkit";
import { TERMINAL_ID } from "constants/app.constant";
const userType = localStorage.getItem("mType");

const stateSlice = createSlice({
    name : "requestBook/state",
    initialState : {
        manageRequestModal : false,
        showErrModal : false,
        ErrModalMsg : "",
        getRequestBook : false,
        activeTab : 0
    },
    reducers : {
        setManageRequestModal : (state,action) => {
            state.manageRequestModal = action.payload;
        },
        setActiveTab : (state,action) => {
            state.activeTab = action.payload;
        },
        setManageModal : (state,action) => {
            state.showErrModal = action.payload.showErrModal;
            state.ErrModalMsg = action.payload.ErrModalMsg;
            state.getRequestBook = action.payload.getRequestBook;
        }
    }
});

export const {
    setManageRequestModal,
    setActiveTab,
    setManageModal
} = stateSlice.actions;

export default stateSlice.reducer;