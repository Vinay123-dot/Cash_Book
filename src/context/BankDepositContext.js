import React,{createContext, useState,useMemo} from "react";
import PropTypes from "prop-types";

const intialObj = {
    depositList : [],
    depositModeList : [],
    returnType : [],
    salesType : [],
    returnOrderResponseData : {},
    showBankDepositLoader : false,
    showErrorModal : false,
    verifyBtnLoading : false,
    errorMessage : ""
};

const BankDepositContext = createContext();


const BankDataProvider = ({children}) => {
    
    const [bankDepositData,setBankDepositData] = useState(intialObj);

    const bankMemo = useMemo(
      () => ({bankDepositData, setBankDepositData}),
      [bankDepositData, setBankDepositData]
    );

    return (
        <BankDepositContext.Provider value = {bankMemo}>
            {children}
        </BankDepositContext.Provider>
    )
};

export { BankDepositContext, BankDataProvider };

BankDataProvider.propTypes = {
    children : PropTypes.node.isRequired
};