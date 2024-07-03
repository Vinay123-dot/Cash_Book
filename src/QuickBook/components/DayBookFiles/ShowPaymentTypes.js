import React from "react";
import { FaRupeeSign } from "react-icons/fa";
import { getTotalMoneyInDayBook } from "../CompConstants";
import ParagraphTag from "../../../constants/PTag";
import amountFormatter from "../../../utils/amountFormatter";

const ShowPaymentTypes = (props) => {
    const { paymentValues,isFromAdvPayments = true } = props;

    return <>
        <hr style={{ border: "5px solid #F4F6F9" }} />
        <ParagraphTag label="Summary" />
        <div className="flex flex-col px-4 py-2">
            <p className="text-start font-semibold">Total Bill Amount</p>
            <div className="flex items-center">
                {/* <FaRupeeSign style={{ fontSize: 16, marginRight: 2 }} /> */}
                <p>{amountFormatter(paymentValues.bill_value || 0)}</p>
            </div>
        </div>
        <div className="flex flex-col justify-between items-start px-4 py-2 lg:items-center  lg:flex-row">
            <div className="flex flex-col">
                <p className="text-start font-semibold">Payment Type</p>
                {
                    paymentValues.cash_amount && <p className="text-start"> Cash - {amountFormatter(paymentValues.cash_amount || 0)}</p>
                }
                {
                    paymentValues.online_bank_amount && <p className="text-start"> Bank - {amountFormatter(paymentValues.online_bank_amount || 0)}</p>
                }

                {
                    paymentValues.upi_amount && <p className="text-start"> Upi - {amountFormatter(paymentValues.upi_amount || 0)}</p>
                }
                {
                    paymentValues.bank_cheque_amount && <p className="text-start"> Cheque - {amountFormatter(paymentValues.bank_cheque_amount || 0)}</p>
                }
                {
                    paymentValues.credit_card_amount && <p className="text-start"> Credit Card - {amountFormatter(paymentValues.credit_card_amount || 0)}</p>
                }
                {
                    paymentValues.debit_card_amount && <p className="text-start"> Debit Card - {amountFormatter(paymentValues.debit_card_amount ||0)}</p>
                }
                {
                    paymentValues.pg_order_amount && <p className="text-start"> Payment Gateway - {amountFormatter(paymentValues.pg_order_amount || 0)}</p>
                }
                {
                    paymentValues.reference_order_amount && <p className="text-start"> Online Order - {amountFormatter(paymentValues.reference_order_amount || 0)}</p>
                }


            </div>
            {
                isFromAdvPayments && <>
                    <div className="flex flex-col">
                        <p className="text-start font-semibold">Advance Used Amount</p>
                        {/* <p>{paymentValues.used_receipt_amount}</p> */}
                        {<p className="text-start">{amountFormatter(paymentValues.advance_receipt_amount || 0)}</p>}
                    </div>
                    <div className="w-60 ">
                        <p className="text-start font-semibold"> Pending Amount</p>
                        <p className="text-start">{amountFormatter(Number(paymentValues.bill_value) - getTotalMoneyInDayBook(paymentValues))}</p>
                    </div>
                </>
            }
            
        </div>
    </>



}

export default ShowPaymentTypes;