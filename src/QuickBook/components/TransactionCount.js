import React from "react";
import { useSelector } from "react-redux";
import amountFormatter from "utils/amountFormatter";

const TransactionCount = () => {

    const { totalPaymentCount } = useSelector(state => state.quickbookStore.data);

    const getCardAmount = () => {
       let cardAmount =  Number(totalPaymentCount.Credit_Card_Amount || 0) + Number(totalPaymentCount.Debit_Card_Amount || 0);
       return cardAmount;
    }

    return (
      <>
        <hr className="border border-[#F4F6F9]" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 px-10 py-2">
            {
                <div className="flex flex-col">
                    <label htmlFor = "cash_amt" className="text-blue-600 text-md font-medium tracking-wide mb-1">Cash Amount</label>
                    <p id="cash_amt" className="text-sm font-bold">{amountFormatter(totalPaymentCount.Cash_Amount)}</p>
                </div>
            }
            {
                <div className="flex flex-col">
                    <label  htmlFor = "upi_amt" className="text-blue-600 text-md font-medium tracking-wide mb-1">Upi Amount</label>
                    <h4 id = "upi_amt" className="text-sm font-bold">{amountFormatter(totalPaymentCount.UPI_Amount)}</h4>
                </div>
            }
            {
                <div className="flex flex-col">
                    <label htmlFor = "bank_amt" className="text-blue-600 text-md font-medium tracking-wide mb-1">Bank Amount</label>
                    <p id = "bank-amt" className="text-sm font-bold">{amountFormatter(totalPaymentCount.Online_Bank_Amount)}</p>
                </div>
            }
            {
                <div className="flex flex-col">
                    <label htmlFor = "card_amt"  className="text-blue-600 text-md font-medium tracking-wide mb-1">Card Amount</label>
                    <p   id = "card_amt" className="text-sm font-bold">{amountFormatter(getCardAmount())}</p>
                </div>
            }
            {
                <div className="flex flex-col">
                    <label  htmlFor = "card_amt" className="text-blue-600 text-md font-medium tracking-wide mb-1">Cheque Amount</label>
                    <h4 id="card_amt" className="text-sm font-bold">{amountFormatter(totalPaymentCount.Bank_Cheque_Amount)}</h4>
                </div>
            }
        </div>
      </>
    );

}

export default TransactionCount;