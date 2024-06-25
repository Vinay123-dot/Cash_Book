import React from "react";
import { FaRupeeSign } from "react-icons/fa";
import { getTotalMoneyInDayBook } from "../CompConstants";
import ParagraphTag from "../../../constants/PTag";

const ShowPaymentTypes = (props) => {
    const { paymentValues,isFromAdvPayments = true } = props;

    return <>
        <hr style={{ border: "5px solid #F4F6F9" }} />
        <ParagraphTag label="Summary" />
        <div className="flex flex-col px-4 py-2">
            <p className="text-start">Total Bill Amount</p>
            <div className="flex items-center">
                <FaRupeeSign style={{ fontSize: 16, marginRight: 2 }} />
                <p>{paymentValues.bill_value || 0}</p>
            </div>
        </div>
        <div className="flex flex-col justify-between items-start px-4 py-2 lg:items-center  lg:flex-row">
            <div className="flex flex-col">
                <p className="text-start">Payment Type</p>
                {
                    paymentValues.cash_amount && <p className="text-start"> Cash - {paymentValues.cash_amount}</p>
                }
                {
                    paymentValues.online_bank_amount && <p className="text-start"> Bank - {paymentValues.online_bank_amount}</p>
                }

                {
                    paymentValues.upi_amount && <p className="text-start"> Upi - {paymentValues.upi_amount}</p>
                }
                {
                    paymentValues.bank_cheque_amount && <p className="text-start"> Cheque - {paymentValues.bank_cheque_amount}</p>
                }
                {
                    paymentValues.credit_card_amount && <p className="text-start"> Credit Card - {paymentValues.credit_card_amount}</p>
                }
                {
                    paymentValues.debit_card_amount && <p className="text-start"> Debit Card - {paymentValues.debit_card_amount}</p>
                }
                {
                    paymentValues.pg_order_amount && <p className="text-start"> Payment Gateway - {paymentValues.pg_order_amount}</p>
                }
                {
                    paymentValues.reference_order_amount && <p className="text-start"> Online Order - {paymentValues.reference_order_amount}</p>
                }


            </div>
            {
                isFromAdvPayments && <>
                    <div className="flex flex-col">
                        <p className="text-start">Advance Used Amount</p>
                        {/* <p>{paymentValues.used_receipt_amount}</p> */}
                        {<p className="text-start">{paymentValues.advance_receipt_amount}</p>}
                    </div>
                    <div className="w-60 ">
                        <p className="text-start"> Pending Amount</p>
                        <p className="text-start">{Number(paymentValues.bill_value) - getTotalMoneyInDayBook(paymentValues)}</p>
                    </div>
                </>
            }
            
        </div>
    </>



}

export default ShowPaymentTypes;