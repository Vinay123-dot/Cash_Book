import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getToday,getTomorrowDate } from "../../utils/dateFormatter";
import amountFormatter from "../../utils/amountFormatter";

const TransactionCount = () => {

    const { totalPaymentCount } = useSelector(state => state.quickbookStore.data);
    let userType = localStorage.getItem("mType");
  
   
  

    return (
        <>
            {
                <div className="flex flex-col  xl:ml-0">
                    <label className="text-blue-600 text-md font-medium tracking-wide mb-1">Cash Amount</label>
                    <p className="text-2xl">{amountFormatter(totalPaymentCount.Cash_Amount)}</p>
                </div>
            }
            {
                <div className="flex flex-col  xl:ml-0">
                    <label className="text-blue-600 text-md font-medium tracking-wide mb-1">Upi Amount</label>
                    <h4 className="text-2xl">{amountFormatter(totalPaymentCount.UPI_Amount)}</h4>
                </div>
            }
            {
                <div className="flex flex-col  xl:ml-0">
                    <label className="text-blue-600 text-md font-medium tracking-wide mb-1">Bank Amount</label>
                    <p className="text-2xl">{amountFormatter(totalPaymentCount.Online_Bank_Amount)}</p>
                </div>
            }
            {
                <div className="flex flex-col  xl:ml-0">
                    <label className="text-blue-600 text-md font-medium tracking-wide mb-1">Cheque Amount</label>
                    <h4 className="text-2xl">{amountFormatter(totalPaymentCount.Bank_Cheque_Amount)}</h4>
                </div>
            }
           
        </>
    )

}

export default TransactionCount;