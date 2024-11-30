import { combineReducers } from "@reduxjs/toolkit";
import reqState from "./stateSlice";
import reqData from "./dataSlice";

const reducer = combineReducers({
    reqState,
    reqData
});

export default reducer;
