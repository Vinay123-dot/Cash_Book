import React,{createContext, useState,useMemo} from "react";
import PropTypes from "prop-types";

const intialObj = {
    showDaybookLoader : false,
    showErrorModal : false,
    getUploadExcelData : true,
    errorMessage : "",
    salesType : [],
    paymentListInfo : [],
    upiTypeInfo : [],
    customerListInfo : [],
    excelArray : [],
    selectedExcelArray : [],
    receiptsArray : []
}
const DaybookDataContext = createContext();


const DaybookDataProvider = ({children}) => {
    const [daybooKData,setDaybookData] = useState(intialObj);
    
    const daybookMemo = useMemo(
        () => ({daybooKData,setDaybookData}),
        [daybooKData, setDaybookData]
      );

    return (
        <DaybookDataContext.Provider value = {daybookMemo}>
            {children}
        </DaybookDataContext.Provider>
    )
};

export {DaybookDataContext,DaybookDataProvider};

DaybookDataProvider.propTypes = {
    children : PropTypes.node.isRequired
};