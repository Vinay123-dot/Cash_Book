import React,{createContext, useState} from "react";

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
    return (
        <DaybookDataContext.Provider value = {{daybooKData,setDaybookData}}>
            {children}
        </DaybookDataContext.Provider>
    )
};

export {DaybookDataContext,DaybookDataProvider};