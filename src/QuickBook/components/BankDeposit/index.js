import React from "react";
import { BankDataProvider } from "context/BankDepositContext";
import BankDepositMainPage from "./BankDepositMainPage";


const BankDeposit =() => {
    return (
        <BankDataProvider>
            <BankDepositMainPage/>
        </BankDataProvider>
    )
};

export default BankDeposit;