import React from "react";
import ReqBookFile from "./components/MainFile";
import { injectReducer } from "store";
import  requestBookReducer from "./store/index";

injectReducer('requestBook', requestBookReducer);

const RequestBook = () => {
    return (
        <ReqBookFile/>
    )
};

export default RequestBook;